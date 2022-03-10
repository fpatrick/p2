# Your Numbers

Your Numbers is a site that provides great tools for improving people's health by giving tools to successfully achieve a healthy body.

TDEE and Macro calculation is a fundamental part of the popular flexible diet (simple weight loss plan that allows foods that fit within your specific daily macronutrient targets). BMI is widely used as a general indicator of whether a person has a healthy body weight for their height. 

It is fully responsive, easy to navigate, fast, scalable, and never requires to refresh the page.

![Responsice Mockup](https://user-images.githubusercontent.com/39106404/157756663-75d91132-271a-4c35-acba-c4d42bde65c8.png)

## Features 

### Existing Features

- __Landing Page__

  - User-friendly landing page asking for what they need.

    ![Logo](https://user-images.githubusercontent.com/39106404/157757737-2a7c33d2-af1f-4a5b-a638-562207e05262.png)

- __Navigation__

  - Bar and footer with navigation buttons to easily go to next needed tool.
  - The current page will be highlighted as active.

    ![Game](https://user-images.githubusercontent.com/39106404/157757813-2299a7e4-bc51-45a3-b3c5-321b7ba8c6d1.png)
    ![Game](https://user-images.githubusercontent.com/39106404/157757836-b18b2eb1-bbcb-42cb-83a3-f9c447a5ce14.png)

- __TDEE and BMI Calculator__

  - Calculate TDEE and BMI
  - Dynamically change between the metric system and imperial system
  - All fields are required and allow only numbers to avoid confusion.

    ![Question](https://user-images.githubusercontent.com/39106404/157757888-4cc18a12-23b9-4196-9968-fedf1e90ddba.png)

- __TDEE Result Cards__

  - This section provides responsive cards with the results
  - Important information is colored 
  - Page scroll to cards when click calculate
  - Automatically add calories to the recipes website

    ![score](https://user-images.githubusercontent.com/39106404/157757925-a4b85b64-332c-4b55-b91a-5c9496b8048f.png)

- __BMI Calculator__

  - Calculate BMI with minimal information
  - Dynamically change between the metric system and imperial system

    ![score](https://user-images.githubusercontent.com/39106404/157757958-babf482b-24cc-4516-8aa6-a457b905b2f1.png)

- __BMI Result Cards__

  - This section provides responsive cards with the results
  - Important information is colored 
  - Page scroll to cards when click calculate

    ![score](https://user-images.githubusercontent.com/39106404/157757977-fd174bf2-d53e-4f3d-918e-ade53f7d0e66.png)

### Features Left to Implement

- The cards are made dynamically, many other tools or calculators can be added

## Testing 

### Validator Testing 

- HTML
    - No errors were returned when passing through the official [W3C validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Ffpatrick.github.io%2Fp2%2F)
- CSS
    - No errors were found when passing through the official [(Jigsaw) validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Ffpatrick.github.io%2Fp2%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)
- JavaScript
    - No errors were found when passing through the official [Jshint validator](https://jshint.com/)
      - The following metrics were returned: 
      - There are 13 functions in this file.
      - Function with the largest signature take 4 arguments, while the median is 1.
      - Largest function has 28 statements in it, while the median is 3.
      - The most complex function has a cyclomatic complexity value of 8 while the median is 1.

### Unfixed Bugs

Bugs not found to date.

## Deployment

- The site was deployed to GitHub pages. The steps to deploy are as follows: 
  - In the GitHub repository, navigate to the Settings tab 
  - From the source section drop-down menu, select the Master Branch
  - Once the master branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment. 

The live link can be found here - https://fpatrick.github.io/p2/

## Credits 

### Content 

- Equation and information about TDEE and Macros was taken from [healthline.com](https://www.healthline.com/nutrition/how-to-count-macros#step-by-step)
- BMI equation was taken from [cdc.gov](https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/index.html)
- Information about what is BMI was taken from [diabetes.ca](https://www.diabetes.ca/managing-my-diabetes/tools---resources/body-mass-index-(bmi)-calculator)

### Tools

- Frontend framework [boostrap](https://getbootstrap.com/)
- Fonts [font awesome](https://fontawesome.com/)
- Colors [apple visual design](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color/)
