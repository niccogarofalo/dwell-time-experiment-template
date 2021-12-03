This repository contains code that can be used as a template for dwell-time experiments which can be hosted on [pavlovia.org](https://pavlovia.org/)

**Table of Contents**
- [Overview](#overview)
- [How To: Import Experiment](#how-to-import-experiment)
- [How To: Test/Run Experiment](#how-to-testrun-experiment)
- [How To: Create New Slideshows and Add Stimuli](#how-to-create-new-slideshows-and-add-stimuli)
- [Explanation: The Settings File](#explanation-the-settings-file)
- [Explanation: 'Options' Customization](#explanation-options-customization)

# Overview
**Q.** What is a dwell-time experiment?    
**A.** This dwell-time experiment refers to participants watching a series of stimuli such as text, photos, videos, or audio, and clicking through them. The time spent at each stimuli is referred to as their dwell-time.

**Q.** How does this whole thing work?  
**A.** This is a public repository that you may import to pavlovia to create dwell-time experiments. You can customize the experiment by uploading your own stimuli to be displayed, and choosing how participants interact with those stimuli. The data for each completed trial will be uploaded to pavlovia where you can retrieve and analyze that data.

# How To: Import Experiment
- The first step in setting up the experiment for yourself is creating an account on [pavlovia.org](https://pavlovia.org/). Note: creating an account and testing your experiment is free, but administering the experiment will cost money (we are not associated with pavlovia in any way).  
- Once an account is created, you'll need to host the experiment on pavlovia's gitlab server. Go to [gitlab.pavlovia.org](https://gitlab.pavlovia.org/), login with your pavlovia credentials if you're not already, click on the logo in the top left to go to your projects page, and create a new project.  
- At the top, you should see options to create a blank project, a project from a template, and to import a project. Choose "Import Project".  
- Of the many types of imports, choose 'Repo by URL' and paste the URL of this github project into the 'Git repository URL' box, all other fields can be filled out as you wish.  
- At this point, you can return to [pavlovia.org](https://pavlovia.org/) and find your experiment under the [Experiments Dashboard](https://pavlovia.org/dashboard?tab=1).

# How To: Test/Run Experiment
- There are two basic functionalities to experiments: piloting experiments (which can be thought of as testing), and running experiments.  
- Select your experiment from the [Experiments Dashboard](https://pavlovia.org/dashboard?tab=1) on pavlovia.  
- From the experiment's interface, you can choose to either 'pilot' the experiment, 'run' the experiment, or make the experiment 'inactive'.  
- If you choose **PILOTING**, then you may 'pilot' the experiment. All data collected from a pilot trial will be downloaded onto your own computer. (This is completely free as of 11/22/2021.) This allows for simple and free testing of your experiment.  
- If you choose **RUNNING**, then you can use the URL provided in the 'Recruitment' box to take the test yourself or send it to participants. Data collected from these trials are sent to pavlovia where it can be downloaded in the 'Sessions' box. (These trials will consume credits if that's how you chose to pay for Pavlovia, or requires a paid license with Pavlovia.)  
- **IF YOU UPDATE THE PROJECT IN ANY WAY** such as changing the settings, adding stimuli to an existing slideshow, or creating a new slideshow, then you will have to toggle the experiment to the inactive state and then back to your choice of the piloting or running state to see the change go into effect. (Yes, this means that anyone who tries to take your trial while the experiment updates will receive an error.)  
- If you have just downloaded this project and attempt to pilot/run the experiment, you should not see any images or other visual stimuli because...  
- **How To: Display A Specific Slideshow** you must add a 'URL Parameter' to the end of the url of the form "slideshow=\[slideshow-name\]". See below for example:  
  - **How to: Add a URL parameter**  
    Suppose you have the URL https://example.com/website 
    To add any URL parameter, you must first add a question mark (?) to the end of the URL  
    Then, you add the name of the parameter, an equals sign, and finally the value of the parameter   
    Thus, if you wanted to add a URL parameter titled 'name' and assign it the value 'john' the URL would be:  
    https://example.com/website?name=megan  
    Then, if you wanted to add more URL parameters, you just separate them with an ampersand (&)
    So, to add megan's last name, you could have the URL:
    https://example.com/website?name=megan&lastName=rapinoe
  - This practice can be extended to our experiment to determine which slideshow to play.  
    Your trial URL should have the form: https://run.pavlovia.org/[my-account-name]/[my-experiment-name]...
    If you wanted to play a slideshow named 'example-slideshow', you would add the URL parameter "slideshow=example-slideshow" to the end of the trial URL  
    Remember, if the URL already has parameters, add an (&) instead of a (?)
    Try it out yourself! See if you can get the example-slideshow to play (it comes preloaded with this project)

# How To: Create New Slideshows and Add Stimuli
- Go to Pavlovia's gitlab server [gitlab.pavlovia.org](https://gitlab.pavlovia.org/) and go to the dashboard for your experiment.
- On the project's front page, you should see a file system. The most important files for interacting with the project are 'settings.js' which will be covered in the [Explanation: The Settings File](#explanation-the-settings-file) chapter of this document, the 'slideshows.slsx' excel file, and a folder titled 'slideshow-directory'.
  **How To: Create a New Slideshow**
  - Download and open the excel file **slideshows.slsx**. 
  - In the excel file, you will see a sheet with three columns, titled 'type', 'data', and 'options' respectively.
  - The first step in creating a new slideshow is creating a new sheet in the excel file. Whatever name you give that sheet will be the official name for that slideshow. For instance, the sheet that comes with the experiment is named 'example-slideshow', hence the reason you can play a slideshow named 'example-slideshow'
  - In cells A1 through A3, name them 'type', 'data', and 'options' respectively, (just like the 'example-slideshow' sheet)
  - The values in these cells will determine exactly which stimuli will be played during the slideshow and how they will be presented.
  - The **data** column:
    - This column is arguably the most important and is generally required.
    - The values of this column are the stimuli that are displayed during the experiment.
    - Stimuli are displayed in order, top to bottom and the values can either be the name of a file or just plain text.
  - The **type** column:
    - This column is optional and cells may only take one of 4 values, "audio", "video", "image", "text".
    - The value you enter in this column describes what content is found in the 'data' column. The reason it is optional is that if the 'type' is left as blank, the project will try to interpret the type of the data. For instance, if the data column contains the entry 'something.jpg', the project will assume that the 'type' is "image" because .jpg is a common image file format. If no type can be inferred, the type will be assumed to be "text" and then the entry of the 'data' column will be displayed as regular text during the experiment.
  - The **option** column:
    - This column is optional and can be used to customize specific stimuli. You can customize the keys that can be pressed to advance the trial, text that appears below images, and many other features. This is explained more here: [Explanation: 'Options' Customization](#explanation-options-customization)
  - Once you have made your desired changes, you can upload the updated excel sheet to your project on [gitlab.pavlovia.org](https://gitlab.pavlovia.org/). You should delete/overwrite the old excel file.
- At this point you've created/modified a slideshow using the excel sheet, but there is still one more step so your project actually has access to the stimuli in the 'data' column...
  **How To: Manage Files and Upload Stimuli**
  - Open the 'slideshow-directory' folder, you should see a sub-folder named 'example-slideshow'. In the 'example-slideshow' folder, you can see a list of files that correspond to the stimuli for that experiment.
  - This is the basic format for dwell-time slideshows: For each slideshow that you want to host, you must create a folder within the 'slideshow-directory' folder. The name of this sub-folder should match the official name of a slideshow (as determined by the name of **slideshows.slsx**'s sheet names). And any file named on that excel sheet should be uploaded to this folder.
  - A step-by-step example:
    - Assume you created a sheet in **slideshows.slsx** named 'simple-images' with the data 'img1.jpg', 'img2.jpg', 'img3.jpg', and 'img4.jpg'.
    - In the top right of your project in [gitlab.pavlovia.org](https://gitlab.pavlovia.org/), click on "Web IDE" (make sure you're logged in)
    - Open the dropdown menu for 'slideshow-directory' in the file explorer.
    - Choose 'New directory'
    - Name the sub-directory after your excel sheet, simple-images, such that the full directory name is slideshow-directory/simple-images
    - Open the dropdown menu for the simple-images folder and select 'Upload file'
    - Navigate to the files on your computer, select all of the ones that appear in simple-images' data column (which in this case is 'img1.jpg', 'img2.jpg', 'img3.jpg', and 'img4.jpg'), and upload them
    - Finally, to actually push all these changes through to your project, hit "Commit", make sure "Commit to **master** branch" is selected, and hit "Stage and Commit"
- Once all these steps have been completed, you should now be able to run an experiment with this slideshow by using the 'slideshow' URL parameter with the name of your new slideshow!

# Explanation: The Settings File
The settings file provides an easy way to modify certain properties of your experiment.  
The easiest way to modify the settings file is by opening the "Web IDE" for your project in [gitlab.pavlovia.org](https://gitlab.pavlovia.org/), selecting "settings.js", making your desired changes, and confirming those changes by hitting 'Commit', then 'Stage and Commit'.  
In the settings file, there are variables you can change and functions you can call, each of which is explained here.
**Variables**
- **length_of_participant_id:** A participant ID is a randomly generated alpha-numeric string (A longer string ensures that it's less likely for two participants to share the same ID). If you would not like a participant ID, set the value to 0. IDs can be useful if you need to match the data of an individual taking this experiment with them taking a survey. For example, the origins of this variable was a qualtrics survey that would link to a dwell-time experiment. At the end of the dwell-time experiment, the participant would copy their ID and paste it into qualtrics so the data of the survey & experiment could be matched.
- **name_of_xlsx_file:** The variable of this variable should always be the same as the name of the excel file that is used to store slideshow/stimuli data.
- **default_advancement_key:** The value of this variable defines the default key that participants press to advance through stimuli. To see all valid keys that can be used, go to https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/ and scroll to the table titled **A Full List of Key Event Values** and use the value that appears in the EVENT.KEY column. (Note that this is overwritten for stimuli where you use the "key_choices" options modifier.)
**Functions**
- **addToIntro(dataType, text, options):** Calling this method will add a stimuli to the start of your experiment (before anything from the slideshow, as defined in the excel file, is shown).
  - **dataType:** Can be "resize" or "text". If the value is "resize", the experiment will prompt the user to scale a box and continue. Depending on how the user scales the box, it will also scale the size of any stimuli they are shown, this allows for users on different sized screens to see the same sized stimuli. If the value is "text", the user will just be shown some text.
  - **text:** This is the display text for this stimuli. Note that any formatting inside the text such as line breaks or bolded words should be handled via HTML tags in the text.
  - **options:** These are modifiers, as defined in [Explanation: 'Options' Customization](#explanation-options-customization)
- **addToConclusion(dataType, text, options):** This is the same as the addToIntro() function except it adds the stimuli to the end of the slideshow, after all other stimuli have been shown.

# Explanation: 'Options' Customization
- More info to come soon.