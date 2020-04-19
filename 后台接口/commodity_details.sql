/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 8.0.16 : Database - xiangmu
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`xiangmu` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `xiangmu`;

/*Table structure for table `commodity_details` */

DROP TABLE IF EXISTS `commodity_details`;

CREATE TABLE `commodity_details` (
  `name` varchar(50) NOT NULL,
  `price` double NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brand` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `derive` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `prototype` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `ratio` varchar(50) DEFAULT NULL,
  `age` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `goodsImg` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `limitation` int(5) DEFAULT NULL,
  `attr` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `heat` int(11) DEFAULT NULL,
  `status` int(1) NOT NULL COMMENT '1 表示已上线 0 表示下线状态',
  `createTime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `commodity_details` */

insert  into `commodity_details`(`name`,`price`,`id`,`brand`,`type`,`derive`,`date`,`prototype`,`category`,`ratio`,`age`,`goodsImg`,`limitation`,`attr`,`heat`,`status`,`createTime`) values ('商品名',222,1,'品牌','型号','作品名','2020-06-11','原型制作','商品类别','比例','适用年龄','upload_29624cbef19674a59e30a7ed1e3f6721.png',3,'upload_29624cbef19674a59e30a7ed1e3f6721.png',11,0,NULL),('请求权',2,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'attr_1587105459005.png',NULL,1,NULL),('1请求权',2,3,NULL,NULL,NULL,'2020-04-17',NULL,NULL,NULL,NULL,NULL,NULL,'attr_1587105459005.png',NULL,1,NULL),('1请求权',2,4,NULL,NULL,NULL,'2020-04-17',NULL,NULL,NULL,NULL,NULL,NULL,'attr_1587105459005.png',NULL,1,'2020-04-17 14:37:38'),('1请求权',2,5,'123',NULL,NULL,'2020-04-17',NULL,NULL,NULL,NULL,NULL,NULL,'attr_1587105459005.png',NULL,1,'2020-04-17 14:37:38'),('1请求权',2,6,'123','123',NULL,'2020-04-17',NULL,NULL,NULL,NULL,NULL,NULL,'attr_1587105459005.png',NULL,1,'2020-04-17 14:37:38'),('1请求权',2,7,'123','123',NULL,'2020-04-17',NULL,NULL,NULL,NULL,NULL,NULL,'attr_1587105459005.png',NULL,1,'2020-04-17 14:37:38'),('天之濑冬马',740,10,'ALTAiR','AL20610','偶像大师 SideM','2020-04-17','ソガ氏（モワノー）','PVC涂装完成品','１／８（全高：约２３０ｍｍ）','15','goodsImg_1587114850022.jpg,goodsImg_1587114850023.jpg,goodsImg_1587114850023.jpg,goodsImg_1587114850023.jpg,goodsImg_1587114850024.jpg,goodsImg_1587114850024.jpg,goodsImg_1587114850024.jpg,goodsImg_1587114850025.jpg,goodsImg_1587114850025.jpg',0,'attr_1587114849704.jpg',NULL,1,'2020-04-17 17:14:09'),('1',66,13,'ALTAiR','AL20610','偶像大师 SideM','2020-04-17','ソガ氏（モワノー）','PVC涂装完成品','１／８（全高：约２３０ｍｍ）','66','goodsImg_1587121800219.jpg',0,'attr_1587121800218.jpg',NULL,1,'2020-04-17 19:10:00');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
