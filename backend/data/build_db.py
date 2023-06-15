import os

# enumerate files in ../frontend/public/image_dataset
# for each file, create a new entry in the database
#   - filename
#   - filepath


def main():
    with open('img.sql', 'w') as f:
        f.write("CREATE DATABASE  IF NOT EXISTS `wsm_img`;\n\n")
        f.write("USE `wsm_img`;\n\n")
        f.write("SET FOREIGN_KEY_CHECKS=0;\n")
        f.write("DROP TABLE IF EXISTS `img`;\n\n")
        f.write("CREATE TABLE `img` (\n")
        f.write("   `id` varchar(255) NOT NULL,\n")
        f.write("   `image` varchar(255) DEFAULT NULL,\n")
        f.write("   PRIMARY KEY (`id`)\n")
        f.write(") ENGINE=InnoDB DEFAULT CHARSET=utf8;\n")
        for dirpath, _, filenames in os.walk('../frontend/public/image_dataset'):
            for file in filenames:
                id = file.split(".")[0]
                path = "/image_dataset/" + file
                # change path into absolute path
                path = os.path.abspath(path)
                f.write(f"INSERT INTO `img` VALUES ('{id}', '{path}');\n")

main()