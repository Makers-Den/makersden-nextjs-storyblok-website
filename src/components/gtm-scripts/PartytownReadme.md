# Partytown

## Quick overview

Partytown is a lightweight open-source solution that reduces execution delays due to third-party JavaScript by offloading third-party scripts to web workers, which run in background threads. This frees up the browser's main thread to run your own code.

## How it works?

The main challenge with a web worker is that it doesn’t have direct access to DOM APIs accessible from the main thread, such as window, document,or localStorage. While a messaging system can be created between the two threads to proxy DOM operations, the postMessage API used for web worker/main thread communication is asynchronous. This means third-party scripts relying on synchronous DOM operations will simply fail.

Partytown provides synchronous access to the DOM API from within web workers using JavaScript proxies, service workers and synchronous XHR requests. Access to the DOM API within the web worker is proxied, creating synchronous XHR requests with the methods and values being accessed (for example, document.title or window.screen.width).

These requests are intercepted by a service worker, which uses postMessage to relay the API request to the main thread asynchronously. By mapping each DOM API request to a synchronous XHR, however, the web worker pauses execution until the service worker responds. The end result is that, from the perspective of the third-party script in the web worker, it’s all synchronous.

### Service worker example

1. Scripts are disabled from running on the main thread by using the type="text/partytown" attribute on the <script/> tag.
2. Service worker creates an onfetch handler to intercept specific requests.
3. Web worker is given the scripts to execute within the worker thread.
4. Web worker creates JavaScript Proxies to replicate and forward calls to the main thread APIs (such as DOM operations).
5. Any call to the JS proxy uses synchronous XHR requests.
6. Service worker intercepts requests, then is able to asynchronously communicate with the main thread.
7. When the service worker receives the results from the main thread, it responds to the web worker’s request.
8. From the point of view of code executing on the web worker, everything was synchronous, and each call to the document was blocking.

### Caveats

The web worker is using fetch to get the third-party scripts, because of that fetching scripts without CORS Headers will throw errors. The solution for that is using proxies.

Currently partytown is not supporting the GTM debug mode, because of that partytown has to be disabled when using GTM debug.

## Next js setup

Install

`yarn add "@builder.io/partytown"`

Add partytown component with config
` <Partytown debug={true} forward={['dataLayer.push']} />`

Add the type="text/partytown" prop for each script that should run from a web worker.

`<script type="text/partytown" dangerouslySetInnerHTML={{ __html: '/* Inlined Third-Party Script */', }} />`

Copy Library Files. A partytown copylib CLI copy task has been provided for convenience which helps copy the Partytown library files to the public directory.

`"scripts": { "build": "npm run partytown && next build", "partytown": "partytown copylib public/~partytown" }`
