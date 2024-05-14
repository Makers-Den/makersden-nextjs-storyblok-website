/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import camelcase from 'camelcase';
import fs from 'fs';
import { type JSONSchema4 } from 'json-schema';
import { compile } from 'json-schema-to-typescript';

import defaultCustomMapper from './defaultCustomMapper';
import { getDatasourceEntries } from './getDatasourceEntries';
import {
  type StoryblokSchemaElement,
  type StoryblokTsOptions,
} from './storyblokSchemaTypes';

const genericTypes = ['asset', 'multiasset', 'multilink', 'table', 'richtext'];

export default async function storyblokToTypescript({
  componentsJson = { components: [] },
  compilerOptions = {},
  customTypeParser,
  path = 'src/typings/generated/components-schema.ts',
  titleSuffix = '_storyblok',
  titlePrefix = '',
}: StoryblokTsOptions) {
  compilerOptions = {
    unknownAny: false,
    bannerComment: '',
    unreachableDefinitions: true,
    ...compilerOptions,
  };
  const tsString: string[] = [
    '/* eslint-disable @typescript-eslint/no-explicit-any */',
    '/* eslint-disable @typescript-eslint/no-unused-vars */',
    "import { SbAsset, SbMultiasset, SbMultilink, SbRichtext, SbTable, StoryblokStory } from './sbInternalTypes';",
  ];
  const getTitle = (t: string) => titlePrefix + t + titleSuffix;
  const pascalcase = (t: string) => camelcase(t, { pascalCase: true });
  const getStoryTypeTitle = (t: string) =>
    `StoryblokStory<${pascalcase(getTitle(t))}>`;

  const groupUuids: Record<string, JSONSchema4> = {};
  const globalBlockComponents: string[] = [];
  const generatedDatasourceTypes: string[] = [];

  componentsJson.components.forEach((value) => {
    if (value.component_group_uuid) {
      if (value.component_group_name === 'block-components') {
        globalBlockComponents.push(value.name);
      }
      if (!groupUuids[value.component_group_uuid]) {
        groupUuids[value.component_group_uuid] = [];
      }
      groupUuids[value.component_group_uuid].push(
        pascalcase(getTitle(value.name))
      );
    }
  });

  async function genEnumType(name: string, blockComponents: string[]) {
    if (blockComponents.length < 1) {
      return;
    }

    const blockComponentsType = {
      $id: '#/' + name,
      title: name,
      enum: blockComponents,
    };
    const ts = await compile(blockComponentsType, name, compilerOptions);
    tsString.push(ts);
  }

  async function genTsSchema() {
    for (const values of componentsJson.components) {
      const obj: JSONSchema4 = {
        $id: '#/' + values.name,
        title: getTitle(values.name),
        type: 'object',
      };
      obj.properties = await typeMapper(values.schema, obj.title!);
      obj.properties._uid = {
        type: 'string',
      };
      obj.additionalProperties = true;
      obj.properties.component = {
        type: 'string',
        enum: [values.name],
      };
      if (values.name === 'global' || values.name === 'page') {
        obj.properties.uuid = {
          type: 'string',
        };
      }
      const requiredFields = ['_uid', 'component'];
      Object.keys(values.schema).forEach((key) => {
        if (values.schema[key].required) {
          requiredFields.push(key);
        }
      });
      if (requiredFields.length) {
        obj.required = requiredFields;
      }
      try {
        const ts = await compile(obj, values.name, compilerOptions);
        tsString.push(ts);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('ERROR', e);
      }
    }
  }

  async function typeMapper(schema: JSONSchema4 = {}, title: string) {
    const parseObj = {};
    for (const key of Object.keys(schema)) {
      const blockComponents: string[] = [];
      // exclude tab-* elements as they are used in storybloks ui and do not affect the data structure
      if (key.startsWith('tab-')) {
        continue;
      }

      const obj: JSONSchema4 = {};
      const schemaElement = schema[key];
      const type = schemaElement.type;

      if (type === 'custom') {
        Object.assign(parseObj, defaultCustomMapper(key, schemaElement));

        if (typeof customTypeParser === 'function') {
          Object.assign(parseObj, customTypeParser(key, schemaElement));
        }

        continue;
      }

      const element = await parseSchema(schemaElement);

      if (!element) {
        continue;
      }

      obj[key] = element;
      if (generatedDatasourceTypes.includes(obj[key].type)) {
        obj[key].tsType = pascalcase(obj[key].type);
      } else if (genericTypes.includes(type)) {
        obj[key].tsType = pascalcase(`sb-${type}`);
      } else if (type === 'bloks') {
        if (schemaElement.restrict_components) {
          if (schemaElement.restrict_type === 'groups') {
            if (
              Array.isArray(schemaElement.component_group_whitelist) &&
              schemaElement.component_group_whitelist.length
            ) {
              let currentGroupElements: string[] = [];
              schemaElement.component_group_whitelist.forEach(
                (groupId: string) => {
                  const currentGroup = groupUuids[groupId];
                  if (Array.isArray(currentGroup)) {
                    currentGroupElements = [
                      ...currentGroupElements,
                      ...currentGroup,
                    ];
                  } else {
                    // eslint-disable-next-line no-console
                    console.log('Group has no members: ', groupId);
                  }
                }
              );
              if (currentGroupElements.length == 0) {
                obj[key].tsType = `never[]`;
              } else {
                obj[key].tsType = `(${currentGroupElements.join(' | ')})[]`;
              }
            }
          } else {
            if (
              Array.isArray(schemaElement.component_whitelist) &&
              schemaElement.component_whitelist.length
            ) {
              schemaElement.component_whitelist.forEach((component: string) => {
                if (!blockComponents.includes(component)) {
                  blockComponents.push(component);
                }
              });
              obj[key].tsType = `(${schemaElement.component_whitelist
                .map((i: string) => pascalcase(getTitle(i)))
                .join(' | ')})[]`;
            } else {
              // eslint-disable-next-line no-console
              console.log('No whitelisted component found');
            }
          }
        } else {
          // eslint-disable-next-line no-console
          console.log(
            'Type: bloks array but not whitelisted (will result in all elements):',
            title
          );
        }
      }
      await genEnumType(
        `${pascalcase(`${title.replace(titleSuffix, '')}-${key}-block-type`)}`,
        blockComponents
      );
      Object.assign(parseObj, obj);
    }
    return parseObj;
  }

  async function parseSchema(element: StoryblokSchemaElement): Promise<{
    type?: string | string[];
    tsType?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }> {
    if (genericTypes.includes(element.type)) {
      return {
        type: element.type,
      };
    }

    let type: string | string[] = 'any';
    let options: string[] = [];

    if (Array.isArray(element.options) && element.options.length) {
      options = element.options.map((item) => item.value);
    }

    if (options.length && element.exclude_empty_option !== true) {
      options.unshift('');
    }

    // option types with source self do not have a source field but the options as array
    if (!element.source && element.options !== undefined) {
      type = 'string';
    }

    // if source to internal stories is not restricted we cannot know about the type contained
    if (
      element.source === 'internal_stories' &&
      element.filter_content_type === undefined
    ) {
      type = 'any';
    }

    if (element.source === 'internal_stories' && element.filter_content_type) {
      if (element.type === 'option') {
        if (Array.isArray(element.filter_content_type)) {
          return {
            tsType: `(${element.filter_content_type
              .map((type2) => getStoryTypeTitle(type2))
              .join(' | ')} | string )`,
          };
        } else {
          return {
            tsType: `(${getStoryTypeTitle(
              element.filter_content_type
            )} | string )`,
          };
        }
      }

      if (element.type === 'options') {
        if (Array.isArray(element.filter_content_type)) {
          return {
            tsType: `(${element.filter_content_type
              .map((type2) => getStoryTypeTitle(type2))
              .join(' | ')} | string )[]`,
          };
        } else {
          return {
            tsType: `(${getStoryTypeTitle(
              element.filter_content_type
            )} | string )[]`,
          };
        }
      }
    }

    // datasource and language options are always returned as string
    if (element.source === 'internal_languages') {
      type = 'string';
    }

    if (element.source === 'internal') {
      const datasourceSlug = element.datasource_slug;
      if (datasourceSlug) {
        if (!generatedDatasourceTypes.includes(datasourceSlug)) {
          generatedDatasourceTypes.push(datasourceSlug);
          try {
            const datasourceEntries = await getDatasourceEntries(
              datasourceSlug
            );
            const datasourceEntriesValues = datasourceEntries.map(
              (entry) => entry.value
            );
            await genEnumType(datasourceSlug, datasourceEntriesValues);
          } catch (e) {
            console.error(
              `Error during datasource fetch (${datasourceSlug}) enum generation: `,
              JSON.stringify(e)
            );

            process.exit(1);
          }
        }

        return {
          type: datasourceSlug,
        };
      } else {
        type = ['number', 'string'];
      }
    }

    if (element.source === 'external') {
      type = 'string';
    }

    if (element.type === 'option') {
      if (options.length) {
        return {
          type,
          enum: options,
        };
      }

      return {
        type,
      };
    }

    if (element.type === 'options') {
      if (options.length) {
        return {
          type: 'array',
          items: {
            enum: options,
          },
        };
      }

      return {
        type: 'array',
        items: { type: type },
      };
    }

    switch (element.type) {
      case 'text':
        return { type: 'string' };
      case 'bloks':
        return { type: 'array' };
      case 'number':
        return { type: 'number' };
      case 'image':
        return { type: 'string' };
      case 'boolean':
        return { type: 'boolean' };
      case 'textarea':
        return { type: 'string' };
      case 'markdown':
        return { type: 'string' };
      case 'datetime':
        return { type: 'string' };
      default:
        return { type: 'any' };
    }
  }
  await genEnumType('BlockComponents', globalBlockComponents);
  await genTsSchema();
  await genEnumType('Datasources', generatedDatasourceTypes);

  if (path) {
    fs.writeFileSync(path, tsString.join('\n'));
  }

  return tsString;
}
