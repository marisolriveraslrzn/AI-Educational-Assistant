from pathlib import Path
import sys

backend_root = Path(__file__).resolve().parent
project_root = backend_root.parent

for path in (backend_root, project_root):
    path_str = str(path)
    if path_str not in sys.path:
        sys.path.insert(0, path_str)

try:
    from app import create_app
except ModuleNotFoundError:
    from backend.app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )