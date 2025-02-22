# Notes

#### Initializing npm package

`npm init`

#### Installing express

`npm install express`

#### Installing google generative ai

`npm install @google/generative-ai`

#### Installing packages if not already installed

`npm install`

#### Installing NVS for Windows

`winget install jasongin.nvs`

#### Adding and changing versions

`nvs add 22`

`nvs use 22`

`nvs add 23.8`

`nvs use 23`

#### Run application

`node index.js`

#### Run application and apply changes automatically

`node --watch index.js`

#### Run application, load the .env file, and apply changes automatically

`node --env-file=.env --watch index.js`

#### Installing npm package for parsing data

`npm install body-parser`

#### For single prompt responses

```
{
    "prompt": "Hello"
}
```

#### For continuous conversation responses

```
{
    "prompts": [
        {
            "role": "user",
            "parts": [
                {
                    "text": "hi, my name is rein"
                }
            ]
        },
        {
            "role": "model",
            "parts": [
                {
                    "text": "hi rein, it's nice to meet you! how can i help you today?\n"
                }
            ]
        },
        {
            "role": "user",
            "parts": [
                {
                    "text": "what is my name"
                }
            ]
        },
        {
            "role": "user",
            "parts": [
                {
                    "text": "i am 21 years old"
                }
            ]
        },
        {
            "role": "user",
            "parts": [
                {
                    "text": "how old am i?"
                }
            ]
        },
        {
            "role": "user",
            "parts": [
                {
                    "text": "my interests are programming and exercising."
                }
            ]
        },
        {
            "role": "user",
            "parts": [
                {
                    "text": "What does SITE mean in UDD?"
                }
            ]
        }
    ]
}

```
