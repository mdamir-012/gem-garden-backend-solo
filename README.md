<h1>Gem-Garden Backend: A Node.js, Express, and MongoDB-Powered Server</h1>

<h2>Key Technologies:</h2>

<h3>Node.js: Powering the backend with a fast, scalable, and event-driven JavaScript runtime.</h3>
<h3>Express: Streamlining API development with a minimal and flexible Node.js web application framework.</h3>
<h3>MongoDB: Providing a scalable and schema-flexible NoSQL database for storing and managing data.</h3>


Authentication

user Details
<h2>signup</h2>
 url/user/signup

<h2>login</h2>
url/user/login

<h2>getting all data</h2>
url/product/read


<h2>Endpoints for Getting the data by category</h2>
url/product/Earrings
url/product/Rings
url/product/Necklaces


<h2>Search Functionality</h2>
You can search anything with this url <br/>
<h3>url/product?q=pandora</h3>

<h2>Pagination</h2>
Example for Pagination <br/>
<h3>url/product?page=1&limit=10</h3>

<h1>Endpoints for User Personal Info</h1>
<h2>To get all the address refer this url</h2>
GET url/userInfo/


<h2>You have to pass these field to create user info to this url</h2>

POST url/userInfo/create

PATCH url/userInfo/edit/:id
<h2>Pass id for edit the personalInfo and necessary data with valid key which is already present</h2>
DELETE url/userInfo/delete/:id
Pass id for deleting the address



