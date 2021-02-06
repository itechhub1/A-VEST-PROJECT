export const emailVerify = (firstname: string, token: string) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
      <title>Email verification</title>
  </head>
  <body class="h-screen overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-800  dark:text-gray-800 select-none">
  <div class="flex flex-col prose">
  
    <div class="flex justify-center items-center mb-2">
      <img src="https://res.cloudinary.com/dlecos9op/image/upload/v1612173390/nzspznpt7pop98gdfoy9.jpg" style="width: 300px;" alt="aimart logo" >
    </div>
      <p class="text-left mb-2 font-normal text-2xl">Dear ${firstname},</p>
      <h1 class="text-blue-700 text-xl font-semibold mb-2">Thank you for registering with Aimart investment</h1>
      <p class="text-gray-800 text-xl  mb-2">kindly Verify your email adress by clicking the link below</p>
      <a href= http://localhost:5000/api/user/verifyemail/${token} style="background-color: blue; color: white; padding-left: 8px; padding-right: 8px; padding-top: 2px; padding-bottom: 2px; border-radius: 10px;"> Activate Account</a>
  </div>
  </body>
  </html>`;
};
