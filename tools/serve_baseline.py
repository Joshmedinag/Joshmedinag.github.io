"""Read-only local preview of an earlier HTML/CSS/JS revision with current media.

Usage: python tools/serve_baseline.py --ref d87533f --port 4185
Media must remain unchanged for a comparable baseline. No checkout or file writes.
"""
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import unquote, urlsplit
import argparse
import subprocess

ROOT = Path(__file__).resolve().parents[1]


def run():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--ref', default='d87533f')
    parser.add_argument('--port', default=4185, type=int)
    args = parser.parse_args()
    subprocess.run(['git', 'rev-parse', '--verify', args.ref], cwd=ROOT, check=True)

    class Baseline(SimpleHTTPRequestHandler):
        def log_message(self, *message):
            pass

        def do_GET(self):
            name = unquote(urlsplit(self.path).path).lstrip('/') or 'index.html'
            target = (ROOT / name).resolve()
            if not target.is_relative_to(ROOT):
                self.send_error(403)
                return
            if target.suffix.lower() in {'.html', '.css', '.js'}:
                result = subprocess.run(['git', 'show', f'{args.ref}:{name}'], cwd=ROOT, capture_output=True)
                if result.returncode == 0:
                    self.send_response(200)
                    self.send_header('Content-Type', self.guess_type(name))
                    self.send_header('Content-Length', str(len(result.stdout)))
                    self.end_headers()
                    self.wfile.write(result.stdout)
                    return
                self.send_error(404)
                return
            super().do_GET()

    print(f'Baseline {args.ref}: http://127.0.0.1:{args.port}/', flush=True)
    ThreadingHTTPServer(('127.0.0.1', args.port), partial(Baseline, directory=ROOT)).serve_forever()


if __name__ == '__main__':
    run()
