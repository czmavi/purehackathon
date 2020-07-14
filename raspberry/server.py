import websocket
import json
import subprocess
import requests
import os

try:
    import thread
except ImportError:
    import _thread as thread
import time

token = ""

def on_message(ws, message):
    print(message)
    msg = json.loads(message)
    if msg["command"] == "START":
        print("starting...")
        proc = subprocess.Popen(['sudo','supervisorctl','start', 'video_looper'])
    if msg["command"] == "STOP":
        print("stoping...")
        proc = subprocess.Popen(['sudo','supervisorctl','stop', 'video_looper'])
    if msg["command"] == "SET_TASK":
        payload = msg["payload"]
        movie = payload["fileId"]
        path = '/home/pi/video/' + movie + '.mp4'
        isFileInPlace = os.path.isfile(path)
        print("file in place: " + str(isFileInPlace))
        if not isFileInPlace:
            subprocess.Popen(['mv', '-v', '/home/pi/video/*', '/home/pi/video/cache'])
            subprocess.Popen(['mv', '/home/pi/video/cache/' + movie + '.mp4', '/home/pi/video/' + movie + '.mp4'])


def on_error(ws, error):
    print(error)

def on_close(ws):
    print("### closed ###")

def on_open(ws):
    ws.send("{ \"command\": \"SET_TOKEN\", \"payload\": \"" + token + "\" }")
    def run(*args):
        while True:
            time.sleep(5)
            ws.send("{ \"command\": \"GET_TASK\" }")
    thread.start_new_thread(run, ())


if __name__ == "__main__":
    url = 'http://192.168.2.1:8999/api/auth/device'
    r = requests.post(url, json={ "deviceId": "raspberry" })
    token = r.json()["token"]
    ws = websocket.WebSocketApp("ws://192.168.2.1:8999/",
                              on_message = on_message,
                              on_error = on_error,
                              on_close = on_close)
    ws.on_open = on_open
    ws.run_forever()
    