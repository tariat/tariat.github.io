import requests
import json
import time
from datetime import datetime
import logging
from autils.messenser import telegram
from autils import data_dir

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("tenping_monitor.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

TENPING_API_URL = "http://tenping.kr/adbox/list"  # 실제 API URL로 변경 필요
API_KEY = "Egr9fTC4vUyadhccDW8W1CkNPSQl3EOa8ulznerJvuvy95IrRvCdu7YWCUJkho0X"  # 실제 API 키로 변경 필요

def get_latest_ads():
    """텐핑 API에서 최신 광고 목록을 가져옵니다."""
    try:
        params = {
            "MemberID": API_KEY,
            "PageSize": 30,
            "CampaignType": 0, #소문 종류(128:클릭형, 1:클릭 체류형, 32:재생형, 8:설치 실행형, 64:참여형, 4:판매형)
            "MinClickPoint":0,
            "MinCurrentPoint":0

        }
        
        # 광고 목록 API 엔드포인트 (실제 엔드포인트로 변경 필요)
        response = requests.get(TENPING_API_URL, params=params)
        
        if response.status_code == 200:
            return response.json()['List']
        else:
            logger.error(f"API 요청 실패: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        logger.error(f"광고 목록 가져오기 오류: {str(e)}")
        return None

def save_known_ads(ads_data):
    """광고 데이터를 파일에 저장합니다."""
    try:
        with open("known_ads.json", "w", encoding="utf-8") as f:
            json.dump(ads_data, f, ensure_ascii=False, indent=2)
    except Exception as e:
        logger.error(f"광고 데이터 저장 오류: {str(e)}")

def load_known_ads():
    """저장된 광고 데이터를 불러옵니다."""
    try:
        with open("known_ads.json", "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        logger.info("저장된 광고 데이터가 없습니다. 새 파일을 생성합니다.")
        return {}
    except Exception as e:
        logger.error(f"광고 데이터 로드 오류: {str(e)}")
        return {}

def format_ad_message(ad):
    """알림 메시지 형식을 지정합니다."""
    timestamp = datetime.fromtimestamp(ad.get("created_at", time.time())).strftime("%Y-%m-%d %H:%M")
    
    message = f"🔔 새로운 광고가 등록되었습니다! 🔔\n\n"
    message += f"📌 제목: {ad.get('ContentTitle', '제목 없음')}\n"
    # message += f"💰 예산: {ad.get('budget', '정보 없음')}\n"
    # message += f"🏢 광고주: {ad.get('advertiser', '정보 없음')}\n"
    message += f"📝 설명: {ad.get('ContentMemo', '설명 없음')}\n"
    message += f"📝 만료일: {ad.get('ExpireDate', '설명 없음')}\n"
    message += f"⏰ 등록 시간: {timestamp}\n"
    message += f"🔗 링크: {ad.get('Link', '링크 없음')}"
    
    return message

def check_new_ads():
    """새로운 광고를 확인하고 알림을 보냅니다."""
    logger.info("새 광고 확인 중...")
    
    # 저장된 광고 데이터 로드
    known_ads = load_known_ads()
    
    # 최신 광고 데이터 가져오기
    latest_ads = get_latest_ads()
    
    if not latest_ads:
        logger.warning("광고 데이터를 가져올 수 없습니다.")
        return
    
    # 새로운 광고 딕셔너리 생성
    new_ads_dict = {}
    for ad in latest_ads:
        ad_id = ad.get("ContentID")
        if ad_id:
            new_ads_dict[ad_id] = ad
    
    new_ads_found = False
    # 새 광고 확인 및 알림 전송
    for ad_id, ad_data in new_ads_dict.items():
        if ad_id not in known_ads:
            new_ads_found = True
            logger.info(f"새 광고 발견: {ad_data.get('ContentTitle', '제목 없음')}")
            
            # 알림 메시지 생성
            message = format_ad_message(ad_data)
            
            # 텔레그램 메시지 전송 (사용자 구현 함수 호출)7490220325:AAGAN-1opzPTAKbMWxUjWIu2XdC2vsuluao
            telegram.send_message(message, bot_token="7490220325:AAGAN-1opzPTAKbMWxUjWIu2XdC2vsuluao", chat_id="5667748305")
    
    if not new_ads_found:
        logger.info("새 광고가 없습니다.")
    
    # 최신 광고 데이터 저장
    save_known_ads(new_ads_dict)


if __name__ == "__main__":
    check_new_ads()
