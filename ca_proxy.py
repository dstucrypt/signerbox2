import http.client
from cgi import parse_qs

WHITELIST = ['masterkey.ua', 'tsp.masterkey.ua', 'ca.informjust.ua']

def application(environ, start_response):
  try:
    request_body_size = int(environ.get('CONTENT_LENGTH', 0))
  except (ValueError):
    request_body_size = 0

  query = parse_qs(environ['QUERY_STRING'])
  from_url = query['from'][0]
  from_url = from_url.replace('http://', '')
  host, url = from_url.split('/', 1)
  if host not in WHITELIST:
      start_response('400 Bad Request', [])
      return [bytes()]

  request_body = environ['wsgi.input'].read(request_body_size)
  conn = http.client.HTTPConnection(host, 80)
  conn.request("POST", '/' + url, request_body)
  response = conn.getresponse()
  start_response('{} {}'.format(response.status, response.reason), [
    ('Content-Type', 'application/octet-stream'),
    ('Access-Control-Allow-Origin', 'https://dstucrypt.github.io'),
#    ('Access-Control-Allow-Origin', '*'),
    ('Vary', 'Origin'),
  ])
  yield response.read()
