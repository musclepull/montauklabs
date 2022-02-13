# Full Stack Evaluation

### **Aravind's Take Home Evaluation.**

This task only has a frontend component. If there was a backend component, I would use TypeScript to build the necessary Node API's with Express

The frontend is built in React and JS.

### **How it Works**

- Clone this repo: Use Git or checkout with SVN using this Web URL: https://github.com/musclepull/montauklabs.git

### **Context**

- I use the the website to get an idea of the patent API: https://patentsview.org/apis/api-endpoints/patents

- Instead of the dropdown selection to select the three companies, I use Material UI Table Component to display them. 
  
- Each company has an assignee_id, that then uses an API URL to retrieve 
  the data described below

- The API returns patent date from the past 5 years from current date with each patent
  being broken down into cpc_section_id. As mentioned in the requirements document, I have only returned the first cpc_section_id entry. However, I DID create an alternate function called loadAlternatePatentData(assingnee_id) in  `./frontend/src/domains/app/thunks/load-data.js`. This does return the patent data broken down and grouped into each cpc_section_id. However, stacked bar charts will not work to display them. Would suggest pie charts by date.

- I use recharts (https://recharts.org/en-US/) to create the stacked bar chart which 
  reveals the necessary data on hover. The ticks are set up as YYYY-MM-01 intervals.

### **Setup**

- To run the front end application, run `docker-compose up -d` from the `./` directory.
- If you need to build the docker file, run `docker build -t "frontend" ./frontend`  from the `./` directory.
- Alternatively, you can run `yarn install` and `yarn start` from the  `./frontend` directory.
