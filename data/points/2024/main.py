import pandas as pd
import numpy as np
import geopandas as gpd
import os
from tqdm import tqdm

DIR = os.path.dirname(__file__)

# data\2024\CN_EV_charging_station_level_2024_kept.csv
# data\2024\europe_2024_final.geojson
# data\2024\usa_2024_final.geojson

PATH1 = os.path.join(DIR, "CN_EV_charging_station_level_2024_kept.csv")
PATH2 = os.path.join(DIR, "europe_2024_final.geojson")
PATH3 = os.path.join(DIR, "usa_2024_final.geojson")

SAVE_PATH1 = os.path.join(DIR, "cn2024.csv")
SAVE_PATH2 = os.path.join(DIR, "eu2024.csv")
SAVE_PATH3 = os.path.join(DIR, "us2024.csv")

# POINT (99.65938007441517 33.76051639832845)
# 编写解析函数 将其转化为元组
def wkt2coord(wkt):
    x, y = wkt[7:-1].split()
    return float(x), float(y)

if __name__ == "__main__":
    # df = pd.read_csv(PATH1)

    # 仅仅保留 geometry 列
    # 首先解析并获得元组，然后新增ID,lat,lon并删除geometry列
    # tqdm.pandas()
    # df["geometry"] = df["geometry"].progress_apply(wkt2coord)
    # df["ID"] = range(1, len(df)+1)
    # df["lat"] = df["geometry"].apply(lambda x: x[1])
    # df["lon"] = df["geometry"].apply(lambda x: x[0])
    # df.drop(columns=["geometry"], inplace=True)
    # # 仅仅保留ID,lat,lon
    # df = df[["ID", "lat", "lon"]]
    # # print(df.head())
    # # 保存
    # df.to_csv(SAVE_PATH1, index=False)

    tqdm.pandas()
    eu = gpd.read_file(PATH2)
    # print(eu.geometry[0].x)
    # print(eu.geometry[0].y)
    # 新增ID,lat,lon并删除geometry列
    # eu["ID"] = range(1, len(eu)+1)
    # eu["lat"] = eu.geometry.y
    # eu["lon"] = eu.geometry.x
    # eu.drop(columns=["geometry"], inplace=True)
    # # 仅仅保留ID,lat,lon
    # eu = eu[["ID", "lat", "lon"]]
    # print(eu.head())
    # # 保存
    # eu.to_csv(SAVE_PATH2, index=False)


    us = gpd.read_file(PATH3)
    # print(us.geometry[0].x)
    # print(us.geometry[0].y)
    # 新增ID,lat,lon并删除geometry列
    us["ID"] = range(1, len(us)+1)
    us["lat"] = us.geometry.y
    us["lon"] = us.geometry.x
    us.drop(columns=["geometry"], inplace=True)
    # 仅仅保留ID,lat,lon
    us = us[["ID", "lat", "lon"]]
    # 保存
    us.to_csv(SAVE_PATH3, index=False)
    print("Done!")






