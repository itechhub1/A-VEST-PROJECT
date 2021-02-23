"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFATemplate = void 0;
var TwoFATemplate = function (secret) {
    return "\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <link href=\"https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css\" rel=\"stylesheet\">\n    <title>Confidential</title>\n</head>\n<body class=\" h-screen flex justify-center items-center text-gray-800\">\n<div class=\"max-w-6xlw-full\">\n    <div class=\"flex flex-col\">\n        <img src=\"https://res.cloudinary.com/dlecos9op/image/upload/v1612173390/nzspznpt7pop98gdfoy9.jpg\" style=\"width: 300px;\" alt=\"aimart logo\" >\n        <h1 class=\"font-semibold text-black text-xl pt-2\">Secret pin</h1>\n        <p class=\"text-xl text-gray-800\">This is a Confidential secret access kindly copy it into a save location</p>\n        <span class=\"text-red-800 text-xs italic\">exposure to will grant unauthorized access to you account</span>\n        \n        <h1 class=\"font-bold text-black font-mono text-2xl\">" + secret + "</h1>\n    </div>\n  \n</div>\n\n</body>\n</html>\n\n";
};
exports.TwoFATemplate = TwoFATemplate;
