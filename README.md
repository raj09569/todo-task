# Todo Application

> **Note**: As per the taks it is developed with Bare React Native project and Expo local-authentication module. As it is mentioned only React Native, i have used only React Native UI elements to create UI.

## Folder structur

1. src
   - assets
     - images (all the image files)
   - components
     - customized and common ui components will be stored here
   - pages
     - All the pages as per routes metioned in Navigationcontainer will be stored here.
   - tests
     - test mockup implementations will be stored here.
   - utils
     - constants
       - commonly used constants list colors, font sizes, route names, session keys.. will be stored here.
     - functions
       - commonly used functions will be stored in this file.
     - STYLE.js
       - commonly used styles will be stored in this file.
   - App.js

##

1. I have implemented unit testing for add button handler in list page and add button in Add Todo page.
2. As mentioned, i have used device local authentication while adding, updating and deleting todo.
3. i have given option to update status of todo in listing page.
4. i am creating a unique id for each todo using randomstring generator which i have mentioned in functions file.
5. i wrote local device authentication code in functions file to be reusable in entire application.
