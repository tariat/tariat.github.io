import json
from urllib.parse import urlencode

BASE_URL = "https://tariat.github.io/"


def create_links(links_file="links.json", src=""):
    """links.json을 읽어 id별로 tariat.github.io 리다이렉트 URL을 만든다."""
    with open(links_file, encoding="utf-8") as f:
        links = json.load(f)

    urls = {}
    for link_id in links:
        query = urlencode({"id": link_id, "src": src}, safe="/")
        urls[link_id] = f"{BASE_URL}?{query}"
    return urls


if __name__ == "__main__":
    # src는 유입 출처 (예: 글 주소)
    src = "aitechupdate.com/ipad-wireless-charging/"
    for link_id, url in create_links(src=src).items():
        print(f"{link_id}: {url}")
