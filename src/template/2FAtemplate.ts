export const TwoFATemplate = (secret: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
    <title>Confidential</title>
</head>
<body class=" h-screen flex justify-center items-center text-gray-800">
<div class="max-w-6xlw-full">
    <div class="flex flex-col">
        <img src="https://res.cloudinary.com/dlecos9op/image/upload/v1612173390/nzspznpt7pop98gdfoy9.jpg" style="width: 300px;" alt="aimart logo" >
        <h1 class="font-semibold text-black text-xl pt-2">Secret pin</h1>
        <p class="text-xl text-gray-800">This is a Confidential secret access kindly copy it into a save location</p>
        <span class="text-red-800 text-xs italic">exposure to will grant unauthorized access to you account</span>
        
        <h1 class="font-bold text-black font-mono text-2xl">${secret}</h1>
    </div>
  
</div>

</body>
</html>

`;
};
