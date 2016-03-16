"""
Copyright 2015, University of Freiburg.
Chair of Algorithms and Data Structures.
Elmar Haussmann <haussmann@cs.uni-freiburg.de>
"""

import re
import math
import socket
import sys
import time
import json


def testJSON():

    msg = []
    names = [ "Bob" , "John" , "Michael"]
    right = [ "Owner" , "Admin" , "Participant"]
    rightLevel = [ "0" , "1" , "2"]

    for i in range(3):
        a = dict()
        a["name"] = names[i]
        a['right'] = right[i]
        a['rightLevel'] = rightLevel[i]
        msg.append(a)
    
    return json.dumps(msg)

def serve(port):
    # qggram = QgramIndex(3)
    # qggram.build_from_file(input_file)
    # Create communication socket and listen on port 80.
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind((socket.gethostname(), port))
    server.listen(3)
    print(socket.gethostname())
    # Server loop.
    while True:
        print("\x1b[1mWaiting for requests on port %d ... \x1b[0m" % port)
        (client, address) = server.accept()
        print("Incoming request at " + time.ctime())
        message = client.recv(8182).decode("ascii")
        # Consider only HTTP GET requests.
        print("Handling request at " + time.ctime())
        match = re.match("^GET /(.*) HTTP", message)
        if not match:
            continue
        query = match.group(1)
        print("HTTP GET request received: \"%s\"" % query)
        content_type = "text/plain"
        # super-trivial decoding for spaces.
        query = re.sub("%20", " ", query)
        query = re.sub("\+", " ", query)
        # Deal with queries starting with ?.
        print("Query after : " , query)
        match = re.match("\?q=(.*)", query)
        if match:
            '''
            prefix = match.group(1)
            print("Answering prefix query for: \"%s\"" % prefix)
            # Normalize prefix.
            prefix = re.sub("[ \W+\n]", "", prefix).lower()
            delta = int(math.floor(len(prefix) / 5))
            # Send results with proper HTTP headers.
            # matches, comps = qggram.find_matches(prefix, delta, k=10)
            # Nice names are better.
            matches = [{"label": x[0][0] + " - " + x[0][1],
                        "name": x[0][0],
                        "year": x[0][1]}
                       for x in matches] '''
            content_type = "application/json"
            # content = json.dumps(matches)
            content = testJSON() 
            print("Returning:\n %s" % content)
        # Otherwise consider query as file name and serve the corresponding
        # file with the right content type (guessed from the suffix).
        else:
            print("else")
            try:
                # Default to search.html
                if query == "":
                    print("empty query")
                    query = "admin.html"
                if query in ["admin.html", "admin.css", "jquery-1.11.3.min.js"]:
                    with open(query) as file:
                        content = file.read()
                        if query.endswith(".html"):
                            content_type = "text/html"
                        if query.endswith(".css"):
                            content_type = "text/css"
                        if query.endswith(".js"):
                            content_type = "application/javascript"
                else:
                    content = ""
            except:
                content = ""
        # Send result with proper HTTP headers.
        # print("Sending content: " + content)
        if content == "":
            result = ("HTTP/1.1 404 Not found\r\n")
        else:
            result = ("HTTP/1.1 200 OK\r\n"
                      "Content-type: %s\r\n"
                      "Content-length: %s\r\n\r\n%s") % (content_type,
                                                         len(content),
                                                         content)
        client.send(result.encode())
        client.close()


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 server.py <port>")
        exit(1)
    port = int(sys.argv[1])
    serve(port)
