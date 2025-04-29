import pandas as pd
import os
from datetime import datetime, timedelta

class MySQL():

    def __init__(self):
        self.connection()

    def connection(self):
        if os.getcwd() == "/Users/open/PycharmProjects/flask_stock" or os.getcwd().find('/Users/kimjinhyung/')>-1:
            print('local connect')
            db_conf = {
                "host": "127.0.0.1",
                "user": "test",
                "password": "test11",
                "database": "flask1",
            }
            import pymysql
            self.con = pymysql.connect(**db_conf)
        else:
            import mysql.connector

            SSH_USERNAME = os.getenv("PA_MYSQL_USER")
            MYSQL_PASSWORD = os.getenv("PA_MYSQL_PW")

            db_conf = {'host': f'{SSH_USERNAME}.mysql.pythonanywhere-services.com',
                      'user': SSH_USERNAME,
                      'password': MYSQL_PASSWORD,
                      'database' : f'{SSH_USERNAME}$flask1'}

            self.con = mysql.connector.connect(**db_conf)

    def __enter__(self):

        return self

    def close(self):
        self.con.close()

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.con.close()

    def read_sql(self,sql):
        df = pd.read_sql(con=self.con, sql=sql)

        return df

    def drop_table(self, table_nm):
        cur = self.con.cursor()
        cur.execute(f'DROP TABLE {table_nm}')
        self.con.commit()

    def run_sql(self, sql, params=None):
        cur = self.con.cursor()

        if params:
            cur.execute(sql, params)
        else:
            cur.execute(sql)

        self.con.commit()

        return 1

    # def read_sql_ym(self, sql):

        # ym_list = [2017, 2018, 2019, 2020]
        # tot = pd.DataFrame()
        #
        # for ym in ym_list:
        #     temp = pd.read_sql(con=self.con, sql=sql.replace('&ym', ym))
        #     if len(tot)==0:
        #         tot = temp.copy()
        #     else:
        #         tot = pd.merge(tot, temp, how='outer', on='')

        # return tot

    def run_file(self, file_nm, ch_dict=None):
        # file_nm='11_order_detail.sql'
        with open(file_nm, 'r', encoding='UTF-8') as f:
            file_con = f.readlines()

        file_list = [f for f in file_con if f[0:2]!='--']
        file_list = ' '.join(file_list)
        file_list = file_list.split(';')

        for idx, f in enumerate(file_list):
            if f.replace(' ','').replace('\n','') == "":
                pass
            else:
                print(f'{idx} query start!')

                if ch_dict!=None:
                    for word, to_word in ch_dict.items():
                        word = str(word)
                        to_word = str(to_word)
                        f = f.replace(word.lower(), to_word)

                print(f)
                self.run_sql(f)

        return 1

    def load_time(self, cla):
        cur = self.con.cursor()
        query = f"SELECT time_text FROM update_status WHERE cla='{cla}'"
        cur.execute(query)
        time_text = cur.fetchone()[0]
        self.con.commit()

        return time_text

    def upload_time(self, cla, time_str=None):
        if time_str == None:
            time_str = datetime.datetime.today().strftime('%Y%m%d_%H%M%S')
        cur = self.con.cursor()
        query = "REPLACE INTO update_status (cla, status, time_text) VALUES (%s, %s, %s)"
        cur.execute(query, [cla, 1, time_str])
        self.con.commit()

    def upload_web_data(self, cla, data, is_medium=False):
        table_nm = "web_data" if is_medium==False else "web_data_mt"
        cur = self.con.cursor()
        query = f"REPLACE INTO {table_nm} (cla, contents) VALUES (%s, %s)"
        cur.execute(query, [cla, data])
        self.con.commit()

    def load_web_data(self, cla, is_medium=False):
        table_nm = "web_data" if is_medium==False else "web_data_mt"
        cur = self.con.cursor()
        query = f"SELECT contents, optr_dttm FROM {table_nm} WHERE cla='{cla}'"
        cur.execute(query)
        rlt = cur.fetchone()
        contents = rlt[0]
        optr_dttm = rlt[1]
        optr_dttm = optr_dttm + timedelta(hours=9)
        optr_dttm = optr_dttm.strftime('%Y/%m/%d %H:%M:%S')
        self.con.commit()

        return contents, optr_dttm

