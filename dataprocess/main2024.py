import os
import geopandas as gpd
import tqdm

DIR = os.path.dirname(__file__)

PATH = os.path.join(DIR, '..', 'data','WebGISdata2024')
SAVE_PATH = os.path.join(DIR, 'output')

PATH1 = os.path.join(PATH, 'housing','china') # norm D
PATH2 = os.path.join(PATH, 'housing','usa') # norm D

PATH3 = os.path.join(PATH, 'poi','usa') # norm E
PATH4 = os.path.join(PATH, 'poi','china') # norm E
PATH5 = os.path.join(PATH, 'poi','europe') # norm E

# Network 待讨论
# PATH6 = os.path.join(PATH, 'Appendix F-network','us') # norm
# PATH7 = os.path.join(PATH, 'Appendix F-network','cn') # norm
# PATH8 = os.path.join(PATH, 'Appendix F-network','eu') # norm

# PATH9 = os.path.join(PATH,  'Appendix F-network','usr') # norm
# PATH10 = os.path.join(PATH, 'Appendix F-network','cnr') # norm
# PATH11 = os.path.join(PATH, 'Appendix F-network','eur') # norm

def simplify_geojson(path, save_path):
    gdf = gpd.read_file(path)
    gdf['geometry'] = gdf['geometry'].simplify(0.01)
    gdf.to_file(save_path, driver='GeoJSON')
    

# 扫描文件夹 打印所有以指定后缀结尾的文件名 以列表形式返回
def scan_files(directory, postfix):
    files_list = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(postfix):
                files_list.append(file)
    return files_list

# 读取 shapefile 文件 并返回 GeoDataFrame
def read_shp(path):
    gdf = gpd.read_file(path)
    return gdf

def rename_columns(gdf, old_name, new_name):
    # print("rename", old_name, "to", new_name)
    gdf.rename(columns={old_name: new_name}, inplace=True)
    return gdf

def merge_gdf(gdf1, gdf2, column):
    # 将 gdf2 指定的列合并到 gdf1
    gdf1[column] = gdf2[column]
    return gdf1

# 文件名分类 将文件名中含有指定关键字的文件名放到一个列表中
def classify_files(files, keywords = ['city', 'state']):
    files_dict = {}
    for keyword in keywords:
        files_dict[keyword] = [file for file in files if keyword in file]
    return files_dict

def merge_diff(gdf1, gdf2):
    # 将后者的属性合并到前者 仅仅合并不同的属性
    diff = find_diff(gdf1, gdf2)
    for column in diff:
        gdf1[column] = gdf2[column]
    return gdf1

def find_diff(gdf1, gdf2):
    # 找后者相较于前者多出的属性
    diff = []
    for column in gdf2.columns:
        if column not in gdf1.columns:
            diff.append(column)
    return diff

def processD(path = PATH1, column = 'norm', SAVEDDIR = 'D', SAVVNAME = 'cn_2024'): 

    name = SAVVNAME + '.json'

    files = scan_files(path, '.geojson')
    gdf = gpd.read_file(os.path.join(path, files[0]))

    for file in tqdm.tqdm(files[1:]):
        tmpGdf = gpd.read_file(os.path.join(path, file))
        columnName = file.split('.')[0].split('_')[-1].replace('dist', 'm buffer')
        tmpGdf = rename_columns(tmpGdf, column, columnName)
        gdf = merge_gdf(gdf, tmpGdf, columnName)

    # rename column
    columnname = files[0].split('.')[0].split('_')[-1].replace('dist', 'm buffer')
    gdf = rename_columns(gdf, column, columnname)

    tqdm.tqdm.write('simplify')
    gdf['geometry'] = gdf['geometry'].simplify(0.01)

    tqdm.tqdm.write('save')
    gdf.to_file(os.path.join(SAVE_PATH, SAVEDDIR, name), driver='GeoJSON')


def processE(path = PATH3, column = 'Mix', SAVEDDIR = 'E', SAVVNAME = 'usa_2024'): 

    name = SAVVNAME + '.json'

    files = scan_files(path, '.geojson')
    gdf = gpd.read_file(os.path.join(path, files[0]))

    for file in tqdm.tqdm(files[1:]):
        tmpGdf = gpd.read_file(os.path.join(path, file))
        columnName = file.split('.')[0].split('_')[-1].replace('dist', 'm buffer')
        tmpGdf = rename_columns(tmpGdf, column, columnName)
        gdf = merge_gdf(gdf, tmpGdf, columnName)

    # rename column
    columnname = files[0].split('.')[0].split('_')[-1].replace('dist', 'm buffer')
    gdf = rename_columns(gdf, column, columnname)

    tqdm.tqdm.write('simplify')
    gdf['geometry'] = gdf['geometry'].simplify(0.01)

    tqdm.tqdm.write('save')
    gdf.to_file(os.path.join(SAVE_PATH, SAVEDDIR, name), driver='GeoJSON')

if __name__ == '__main__':
    # SAVE_PATH = os.path.join(DIR, 'output')
    # dataprocess\output\F\cn-city.geojson

    # ['county_housing_density_1000dist.geojson', 'county_housing_density_300dist.geojson', 'county_housing_density_800dist.geojson']

    # processD()
    # processD(PATH2, column = 'norm', SAVEDDIR = 'D', SAVVNAME = 'us_2024')

    # processE()
    processE(PATH4, column = 'Mix', SAVEDDIR = 'E', SAVVNAME = 'cn_2024')
    processE(PATH5, column = 'Mix', SAVEDDIR = 'E', SAVVNAME = 'eu_2024')



