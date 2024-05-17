import React from 'react'
import { Center } from "@repo/ui/Center";
import { useEffect, useState } from 'react'

const StockTicker = () => {
    const [socket, setSocket] = useState<WebSocket | any>(null);
    useEffect(() => {
        const socket = new WebSocket('wss://ws.finnhub.io?token=cou9jj1r01qr7r8gn3h0cou9jj1r01qr7r8gn3hg');

        // Connection opened -> Subscribe
        socket.addEventListener('open', function (event) {
            socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'BINANCE:BTCUSDT' }))
        });

        // Listen for messages
        socket.addEventListener('message', function message(event): any {
            try {
                const jsonData: any = event.data;
                const parsedData: any = JSON.parse(jsonData);
                function getPValues(data: any): number[] {
                    return data.data.map((entry: any) => entry.p);
                }
                const pValues: any = getPValues(parsedData);
                setSocket(pValues[0])
            } catch (e) {
                console.log(e)
            }
        });
    }, [])
    return (
        <Center >
            <div className="border border-gray-200 rounded-md shadow-md p-6">
                <div className="font-bold text-lg flex justify-center">
                    <img src="/bitcoin.jpg" alt="Logo" width={40} height={40} />
                    <div className="text-xl flex flex-col justify-center">BITCOIN Price: ${socket}</div>
                </div>
            </div>
        </Center>
    )
}

export default StockTicker