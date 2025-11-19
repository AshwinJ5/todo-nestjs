import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <html>
        <head>
          <title>Hello</title>
          <style>
            body {
              margin: 0;
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 48px;
              font-family: Arial, sans-serif;
              color: #ffffff;
              background-color: #000000ee;
              font-weight: bold
            }
          </style>
        </head>
        <body>
          Taskly APIs
        </body>
      </html>
    `;
  }
}
