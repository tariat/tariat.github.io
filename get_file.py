import requests
from bs4 import BeautifulSoup
import os
import re

# 웹사이트에 GET 요청 보내기
response = requests.get("http://xn--9i1bo7bv5t16cltp4sg.kr/bbs/view_image.php")
response.status_code
with open("view_image.php", "w") as f:
    f.writelines(response.text)

    response.raise_for_status()  # 오류 체크
    
    # 한글 인코딩 처리
    response.encoding = 'utf-8'
    
    # HTML 파싱
    soup = BeautifulSoup(response.text, 'html.parser')
        


def download_files_from_board(url, save_dir='downloaded_files'):
    """
    게시판 페이지에서 첨부 파일을 다운로드하는 함수
    
    Args:
        url (str): 게시판 URL
        save_dir (str): 파일을 저장할 디렉토리
    """
    # 저장 디렉토리 생성
    if not os.path.exists(save_dir):
        os.makedirs(save_dir)
    
    # 세션 생성 (쿠키 유지)
    session = requests.Session()
    
    # 헤더 설정 (웹사이트가 봇을 차단하지 않도록)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': url
    }
    
    try:
        # 웹사이트에 GET 요청 보내기
        response = session.get(url, headers=headers)
        response.raise_for_status()  # 오류 체크
        
        # 한글 인코딩 처리
        response.encoding = 'utf-8'
        
        # HTML 파싱
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 파일 링크 찾기 (게시판마다 HTML 구조가 다를 수 있음)
        # 일반적인 a 태그 중 파일 확장자를 가진 링크 찾기
        file_links = []
        for a_tag in soup.find_all('a', href=True):
            href = a_tag['href']
            # 일반적인 파일 확장자 패턴 찾기
            if re.search(r'\.(pdf|doc|docx|xls|xlsx|zip|txt|jpg|jpeg|png|gif)$', href, re.I):
                file_links.append(href)
            # 첨부파일 텍스트를 포함한 링크도 찾기
            elif a_tag.text and ('첨부' in a_tag.text or '파일' in a_tag.text or '다운로드' in a_tag.text):
                file_links.append(href)
        
        # 상대 경로를 절대 경로로 변환
        base_url = '/'.join(url.split('/')[:3])  # http://domain.com
        file_links = [link if link.startswith('http') else base_url + ('' if link.startswith('/') else '/') + link for link in file_links]
        
        print(f"{len(file_links)}개의 파일 링크를 찾았습니다.")
        
        # 파일 다운로드
        for i, file_url in enumerate(file_links):
            try:
                file_response = session.get(file_url, headers=headers, stream=True)
                file_response.raise_for_status()
                
                # 파일 이름 추출
                if 'Content-Disposition' in file_response.headers:
                    # 헤더에서 파일 이름 추출 시도
                    content_disposition = file_response.headers['Content-Disposition']
                    filename = re.findall('filename="(.+)"', content_disposition)
                    if filename:
                        filename = filename[0]
                    else:
                        filename = f"file_{i+1}{os.path.splitext(file_url)[-1]}"
                else:
                    # URL에서 파일 이름 추출
                    filename = os.path.basename(file_url).split('?')[0]
                    if not filename or '.' not in filename:
                        filename = f"file_{i+1}{os.path.splitext(file_url)[-1]}"
                
                # 이름 중복 방지를 위한 숫자 추가
                filepath = os.path.join(save_dir, filename)
                count = 1
                while os.path.exists(filepath):
                    name, ext = os.path.splitext(filename)
                    filepath = os.path.join(save_dir, f"{name}_{count}{ext}")
                    count += 1
                
                # 파일 저장
                with open(filepath, 'wb') as f:
                    for chunk in file_response.iter_content(chunk_size=8192):
                        if chunk:
                            f.write(chunk)
                
                print(f"다운로드 완료: {filename}")
                
            except Exception as e:
                print(f"파일 다운로드 실패: {file_url}, 오류: {str(e)}")
        
        return True
    
    except Exception as e:
        print(f"오류 발생: {str(e)}")
        return False

# 게시판 URL
board_url = "http://xn--9i1bo7bv5t16cltp4sg.kr/bbs/board.php"

# 실행
download_files_from_board(board_url)

# 특정 게시글에서 다운로드하려면 게시글 URL을 직접 지정할 수 있습니다
# 예: download_files_from_board("http://xn--9i1bo7bv5t16cltp4sg.kr/bbs/board.php?bo_table=free&wr_id=123")