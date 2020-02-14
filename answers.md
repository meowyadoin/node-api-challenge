## Mention two parts of Express that you learned about this week.

Express is a JavaScript framework. It is to the backend like React is to the frontend.
It adds support for things like routing and middleware.
 
 ## Describe Middleware?

Middleware are small functions that perform a necessary task and extend the features provided by express. Things like logging and authentication are often handled by middleware. Middleware can be global or local.

 ## Describe a Resource?

This is referring to designing a RESTful API. A resource is:

Accessible via a unique URI
potentially represented in multiple ways
managed via HTTP methods
And a resource's communication happens over a stateless protocol (HTTP)

 ## What can the API return to help clients know if a request was successful?

An api can return a status like 200 or 201 that communicates the request was successful.

 ## How can we partition our application into sub-applications?

Express Router is a way to partition an app into sub-applications. It's a great way to keep things clean and organized based on URIs.