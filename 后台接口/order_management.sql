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

/*Table structure for table `order_management` */

DROP TABLE IF EXISTS `order_management`;

CREATE TABLE `order_management` (
  `account` varchar(20) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quantity` int(5) NOT NULL,
  `time` timestamp NOT NULL,
  `status` int(2) NOT NULL,
  `order_id` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `consignee` varchar(20) NOT NULL,
  `region` varchar(20) NOT NULL,
  `detailed_address` varchar(100) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `leave_word` varchar(100) DEFAULT NULL,
  `freight` int(3) DEFAULT NULL,
  PRIMARY KEY (`account`,`id`),
  KEY `order_id` (`order_id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `order_management` */

insert  into `order_management`(`account`,`id`,`quantity`,`time`,`status`,`order_id`,`consignee`,`region`,`detailed_address`,`phone`,`tel`,`leave_word`,`freight`) values ('XDDDB',15,2,'2020-04-21 00:00:00',0,'123456789123','张三','长沙','雨花区','13456789111','123456','留言',0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
