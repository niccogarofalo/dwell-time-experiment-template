This repository contains code that can be used as a template for dwell-time experiments which can be hosted on [pavlovia.org](https://pavlovia.org/)

**Table of Contents**
- [Overview](#overview)
- [How To: Import Experiment](#how-to-import-experiment)
- [How To: Test/Run Experiment](#how-to-testrun-experiment)
- [How To: Create New Slideshows and Add Stimuli](#how-to-create-new-slideshows-and-add-stimuli)
- [Explanation: The Settings File](#explanation-the-settings-file)
- [Explanation: 'Options' Customization](#explanation-options-customization)

# Overview
Q. What is a dwell-time experiment?    
A. This dwell-time experiment refers to participants watching a series of stimuli such as text, photos, videos, or audio, and clicking through them. The time spent at each stimuli is referred to as their dwell-time.

Q. How does this whole thing work?  
A. This is a public repository that you may import to pavlovia to create dwell-time experiments. You can customize the experiment by uploading your own stimuli to be displayed, and choosing how participants interact with those stimuli. The data for each completed trial will be uploaded to pavlovia where you can retrieve and analyze that data.

# How To: Import Experiment
- The first step in setting up the experiment for yourself is creating an account on [pavlovia.org](https://pavlovia.org/). Note: creating an account and testing your experiment is free, but administering the experiment will cost money (we are not associated with pavlovia in any way).
- Once an account is created, you'll need to host the experiment on pavlovia's gitlab server. Go to [gitlab.pavlovia.org](https://gitlab.pavlovia.org/) and create a new project while logged in.
- Instead of the default 'Blank Project' tab, pick the 'Import Project' tab from the top.
- Select 'Repo by URL' and paste the URL of this github project into the 'Git repository URL' box, all other fields can be filled out as you wish.
- At this point, you can return to [pavlovia.org](https://pavlovia.org/) and find your experiment under the [Experiments Dashboard](https://pavlovia.org/dashboard?tab=1).

# How To: Test/Run Experiment
- There are two basic functionalities to experiments, piloting/testing them, and running them.
- Find your experiment under the [Experiments Dashboard](https://pavlovia.org/dashboard?tab=1) on pavlovia.
- From the experiment's interface, you can choose to either 'pilot' the experiment, 'run' the experiment, or make the experiment 'inactive'.
- If you choose **PILOTING**, then any time someone completes a trial of the experiment by pressing the **Pilot** button, the data will be downloaded onto their own computer. (This is completely free - 11/22/2021)
- If you choose **RUNNING**, then you can use the URL provided in the 'Recruitment' box to take the test yourself or send it to participants. Any trial performed in this mode will be sent to pavlovia where it can be downloaded in the 'Sessions' box. (Each trial in this mode will consume credits if that's how you chose to pay for Pavlovia, or requires a paid license with Pavlovia)
- **IF YOU UPDATE THE PROJECT IN ANY WAY** such as changing the code, adding stimuli to an existing slideshow, or creating a new slideshow, you will have to toggle the experiment to the inactive state and then back to your choice of the piloting or running state to see the change go into effect. (Yes, this means that anyone who tries to take your trial while the experiment updates will receive an error)
- In most cases, if you try to 'pilot' or 'run' the experiment, then all the stimuli will be missing (unless you have changed a setting to override this)...
- **To Display A Specific Slideshow** you must add a 'URL Parameter' to the end of the url of the form "slideshow=\[slideshow-name\]". See below for examples:
  - Suppose your trial URL is https://run.pavlovia.org/\[my-account-name\]/\[my-dwell-time-experiment\]

  If you want to add a URL parameter, you must first add a question mark (?) to the end of the URL

  Then, you can begin to add URL parameters such as the 'slideshow' parameter defined as the name of a slideshow that you would like to display

  Thus, if you wanted to display a slideshow called 'example-slideshow' the URl would be:

  https://run.pavlovia.org/\[my-account-name\]/\[my-dwell-time-experiment\]?slideshow=example-slideshow

  And if you want to add multiple parameters, separate them with an ampersand (&)

  For example, the piloting mode by default has a few URL parameters, so you would add &slideshow=example-slideshow to the end instead of ?slideshow=example-slideshow

  Try it out!

  If you just downloaded the template for this experiment, try piloting the experiment once normally, then again after adding &slideshow=example-slideshow to the very end of the URL, and see how they are different!

# How To: Create New Slideshows and Add Stimuli
- Go to Pavlovia's gitlab server [gitlab.pavlovia.org](https://gitlab.pavlovia.org/) and go to the dashboard for your experiment.
- On the project's front page, you should see a file system. The most important files for interacting with the project are 'settings.js' which will be covered in the [Explanation: The Settings File](#explanation-the-settings-file) chapter of this document, the 'slideshows.slsx' excel file, and the folder titled 'slideshow-directory'.
- Open the 'slideshow-directory' folder, you should see a sub-folder named 'example-slideshow'. In the 'example-slideshow' folder, you can see a list of files that correspond to the stimuli for that experiment.
- This is the basic format for dwell-time slideshows. For each slideshow that you want to host, you must create a folder within the 'slideshow-directory' folder and the name of the folder determines the name of the slideshow. Then, inside your folder, you should put all of the stimulus to be played for that slideshow.
  - How to: Create Project Folders and Upload Media
- But, this alone will not allow you to pilot that slideshow, you also need to **modify the slideshows.slsx** file.
- If you download and open the excel file (slideshows.slsx) you will see a sheet with three columns, titled 'type', 'data', and 'options' respectively. Note that the sheet that these are on is titled 'example-slideshow', the same name as the folder where the stimuli were stored. That bit of information forms the foundation for creating slideshows with this template:
  - **To create a new slideshow**, you have to create a new sheet in the 'slideshows.slsx' excel file. The name of that sheet will be the official name for that slideshow.
  - If you would like that slideshow to contain audio, video, or images, you must also create a sub-folder of the same name inside of the 'slideshow-directory' folder.
  - From there, any file within your sub-folder can be entered into that sheet of the excel file. And the order that files are entered in the 'data' column of the sheet are the order that they are presented during an experiment.
- The **type** column:
  - This column is optional and can only take 4 values, "audio", "video", "image", "text". The value you enter in this column describes what content is found in the 'data' column. The reason it is optional is that if the 'type' of 'data' is left as blank, the project will try to interpret the type of the data. For instance, if the data column contains the entry 'something.jpg', the project will assume that the 'type' is "image" because .jpg is a common image file format. If no type can be inferred, the type will be assumed to be "text" and then the entry of the 'data' column will be displayed as regular text during the experiment.
- The **type** column:
  - This column is generally required. This column is the stimuli that will be displayed during the experiment. It will be displayed in order, top to bottom. It can be a file or just plain text.
- The **option** column:
  - This column is optional and can be used to customize specific stimuli. You can customize the keys that can be pressed to advance the trial, text that appears below images, and many other features. This is explained more here: [Explanation: 'Options' Customization](#explanation-options-customization)

# Explanation: The Settings File
settings.js

# Explanation: 'Options' Customization
excel file options