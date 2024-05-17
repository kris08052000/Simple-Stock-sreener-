// import WebSocket,{WebSocketServer} from "ws";
// import express from 'express';
// import http from 'http';
// import { Server, Socket } from 'socket.io';


//     const socket = new WebSocket('wss://ws.finnhub.io?token=cou9jj1r01qr7r8gn3h0cou9jj1r01qr7r8gn3hg');
    
//     // Connection opened -> Subscribe
//     socket.addEventListener('open', function (event) {
//         socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
//     });
    
//     // Listen for messages
//     socket.addEventListener('message', function message(event) {
//         try{
//             const jsonData: any = event.data;
//             const parsedData: any = JSON.parse(jsonData);
//             function getPValues(data: any): number[] {
//             return data.data.map((entry: any) => entry.p);
//               }
//               const pValues: number[] = getPValues(parsedData);
//               console.log("Price:", pValues[0]);
//         }catch(e){
//             console.log(e)
//         }
//     });
    
//     // Unsubscribe
//      var unsubscribe = function(symbol:any) {
//         socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
//     }

