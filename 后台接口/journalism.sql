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

/*Table structure for table `journalism` */

DROP TABLE IF EXISTS `journalism`;

CREATE TABLE `journalism` (
  `title` varchar(50) NOT NULL,
  `content` varchar(500) NOT NULL,
  `createTime` timestamp NULL DEFAULT NULL,
  `author` varchar(200) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `journalism` */

insert  into `journalism`(`title`,`content`,`createTime`,`author`,`id`) values ('55511','返回家园第十一届11','2020-04-14 16:09:58','458949811',2),('关于清明节期间营业时间调整的通知','致各位手办爱好者：\r\n \r\n\r\n2020年清明节期间本站工作时间调整如下：\r\n4月4日（周六） 至 4月5日（周日）休息，不发货\r\n4月6日（周一）起恢复正常工作\r\n \r\n\r\n\r\n特此告知，造成不便，敬请谅解。','2020-04-14 18:04:24','ALTER ONLINE SHOP阿尔塔在线',4),('关于部分地区暂停发货的通知','致各位手办爱好者：\r\n \r\n接最新通知，受疫情影响，目前湖北省、河南省、西藏自治区、重庆市全境停发，其他省市也有部分区域停发，鉴于停发区域不断变化，恕不作详细公告，我们会根据实际情况安排发货，敬请以站内信通知及物流追踪实际情况为准。\r\n物流停发并不影响补款期限，敬请及时完成尾款支付，以免订单逾期关闭。\r\n \r\n由此给您造成不便深表歉意，感谢您的理解和支持。\r\n如有疑问请及时联系在线客服，谢谢配合。','2020-04-15 16:15:34','ALTER ONLINE SHOP阿尔塔在线',5);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
