import os
import geopandas as gpd
import tqdm

DIR = os.path.dirname(__file__)

PATH = os.path.join(DIR, '..', 'data','WebGIS data')
SAVE_PATH = os.path.join(DIR, 'output')

PATH1 = os.path.join(PATH, 'Appendix D-housing price','cn') # norm
PATH2 = os.path.join(PATH, 'Appendix D-housing price','us') # norm

PATH3 = os.path.join(PATH, 'Appendix E-poi','us') # norm
PATH4 = os.path.join(PATH, 'Appendix E-poi','cn') # norm
PATH5 = os.path.join(PATH, 'Appendix E-poi','eu') # norm

PATH6 = os.path.join(PATH, 'Appendix F-network','us') # norm
PATH7 = os.path.join(PATH, 'Appendix F-network','cn') # norm
PATH8 = os.path.join(PATH, 'Appendix F-network','eu') # norm

PATH9 = os.path.join(PATH, 'Appendix F-network','usr') # norm
PATH10 = os.path.join(PATH, 'Appendix F-network','cnr') # norm
PATH11 = os.path.join(PATH, 'Appendix F-network','eur') # norm

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



def process1(PATH2, column = 'norm', SAVEDDIR = 'D', SAVVNAME = 'us'): 
    files = scan_files(PATH2, '.shp')

    files_dict = classify_files(files)

    for key in files_dict.keys():
        # 若为空则跳过
        if not files_dict[key]:
            continue
        tqdm.tqdm.write(key)
        savename = SAVVNAME + '-' + key + '.geojson'
        gdf = read_shp(os.path.join(PATH2, files_dict[key][0]))
        for file in tqdm.tqdm(files_dict[key][1:]):
            tmpGdf = read_shp(os.path.join(PATH2, file))
            columnName = file.split('.')[0]
            tmpGdf = rename_columns(tmpGdf, column, columnName)
            gdf = merge_gdf(gdf, tmpGdf, columnName)

        gdf.drop(columns=[column], inplace=True)
        gdf['geometry'] = gdf['geometry'].simplify(0.01)
        gdf.to_file(os.path.join(SAVE_PATH,SAVEDDIR, savename), driver='GeoJSON')



if __name__ == '__main__':
    # SAVE_PATH = os.path.join(DIR, 'output')
    # dataprocess\output\F\cn-city.geojson

    PATH12 = os.path.join(SAVE_PATH,'F')

    NAMES = [
        ['cn-city.geojson','cnr-city.geojson'],
        ['eur-city.geojson','eur-city.geojson'],
        ['us-city.geojson','usr-city.geojson']
    ]

    for name in NAMES:
        gdf1 = gpd.read_file(os.path.join(PATH12, name[0]))
        gdf2 = gpd.read_file(os.path.join(PATH12, name[1]))
        gdf1 = merge_diff(gdf1, gdf2)
        gdf1.to_file(os.path.join(PATH12, name[0]), driver='GeoJSON')


    # path = PATH11

    # # 读取 shapefile 文件 并返回 GeoDataFrame
    # files = scan_files(path, '.shp')

    # print(classify_files(files))

    # # 打印第一个文件的属性以供参考
    # gdf = read_shp(os.path.join(path, files[0]))
    # print(gdf.columns)
    # print(gdf.head())

    # process1(path, column = 'density_r', SAVEDDIR = 'F', SAVVNAME = 'eur')

