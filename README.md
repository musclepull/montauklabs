# Full Stack Evaluation

### **Aravind's Take Home Evaluation.**

This task only has a frontend component. If there was a backend component, I would use TypeScript to build the necessary Node API's with Express

The frontend is built in React and JS.

### **How it Works**

- Clone this repo: Use Git or checkout with SVN using this Web URL: https://github.com/musclepull/montauklabs.git

### **Context**

- I use the the website to get an idea of the patent API: https://patentsview.org/apis/api-endpoints/patents

- Instead of the dropdown selection to select the three companies, I use Material UI Table Component to display them. 
  Each company has an assignee_id, that then uses the following api, ex: https://api.patentsview.org/patents/query?q={%22_and%22:[{%22_gte%22:{%22patent_date%22:%222017-02-01%22}},{%22assignee_id%22:%22b1094623-3d25-49e1-938c-197aca941ecf%22}]}&f=[%22patent_number%22,%22patent_date%22,%22cpc_section_id%22]&o={%22per_page%22:%2010000}&s=[{%22patent_date%22:%22asc%22}] , where assignee_id = b1094623-3d25-49e1-938c-197aca941ecf.

  This returns patent date from the past 5 years from current date which each patent being broken down into cpc_section_id. As mentioned in the requirements document, I have only returned the first cpc_section_id entry. However, I DID create an alternate function called loadAlternatePatentData(assingnee_id) in ./frontend/src/domains/app/thunks/load-data.js file. This does return the patent data broken down and grouped into each cpc_section_id. However, stacked bar charts will not work to display them. Would suggest pie charts by date.

  I use recharts to create the stacked bar chart which reveals the necessary data on hover. The ticks are set up as YYYY-MM-01.


### **Setup**

- To run the front end application, run `docker-compose up -d` from the `./` directory.
- If you need to build the docker file, run `docker build -t "frontend" ./frontend`  from the `./` directory.
- Alternatively, you can run `yarn install` and `yarn start` from the  `./frontend` directory.
