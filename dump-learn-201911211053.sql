-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: learn
-- ------------------------------------------------------
-- Server version	5.7.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_ru` varchar(255) DEFAULT NULL,
  `name_en` varchar(255) DEFAULT NULL,
  `name_kk` varchar(255) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'Канада',NULL,NULL,'2019-10-04 02:35:51','2019-10-04 02:35:51'),(2,'Нидерланды',NULL,NULL,'2019-10-04 02:35:51','2019-10-04 02:35:51'),(3,'Великобритания',NULL,NULL,'2019-10-04 02:35:51','2019-10-04 02:35:51'),(4,'США',NULL,NULL,'2019-10-04 02:35:51','2019-10-04 02:35:51'),(5,'Новая Зеландия',NULL,NULL,'2019-10-04 02:35:51','2019-11-12 03:41:15'),(6,'Ирландия',NULL,NULL,'2019-10-04 02:35:51','2019-10-04 02:35:51'),(7,'Турция',NULL,NULL,'2019-10-04 02:35:51','2019-10-04 02:35:51'),(8,'Сингапур',NULL,NULL,'2019-10-04 02:35:51','2019-10-04 02:35:51'),(9,'Малайзия',NULL,NULL,'2019-10-04 02:35:51','2019-10-04 02:35:51'),(10,'ОАЭ',NULL,NULL,'2019-10-04 02:35:51','2019-11-12 03:53:43'),(11,'Республика Корея',NULL,NULL,'2019-10-04 02:35:51','2019-11-12 03:52:55'),(12,'Швейцария',NULL,NULL,'2019-10-04 02:35:51','2019-10-04 02:35:51');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `language` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_ru` varchar(50) DEFAULT NULL,
  `name_en` varchar(255) DEFAULT NULL,
  `name_kk` varchar(255) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language`
--

LOCK TABLES `language` WRITE;
/*!40000 ALTER TABLE `language` DISABLE KEYS */;
INSERT INTO `language` VALUES (4,'английский',NULL,NULL,'2019-11-12 06:35:11','2019-11-12 06:45:32');
/*!40000 ALTER TABLE `language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name_ru` varchar(255) DEFAULT NULL,
  `name_en` varchar(255) DEFAULT NULL,
  `name_kk` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'2019-09-25 05:36:59','2019-09-25 06:31:17','г. Оттава, Канада',NULL,NULL),(2,'2019-09-25 05:37:10','2019-09-25 06:31:17','г. Бернаби и г. Ванкувер (Канада)',NULL,NULL),(3,'2019-09-25 05:37:24','2019-09-25 06:31:17','г. Ванкувер (Канада)',NULL,NULL),(4,'2019-09-25 05:37:40','2019-09-25 06:31:17','г. Сент-Катаринс провинции Онтарио (Канада)',NULL,NULL),(5,'2019-09-24 18:00:00','2019-09-25 06:31:17','г. Бёрнаби (Канада)',NULL,NULL),(6,'2019-09-25 05:38:08','2019-09-25 06:31:17','г. Торонто, Канада',NULL,NULL),(7,'2019-09-25 05:38:27','2019-09-25 06:31:17','г. Гамильтон (Канада)',NULL,NULL),(8,'2019-09-25 05:38:47','2019-09-25 06:31:17','г. Китченер (Канада)',NULL,NULL),(9,'2019-09-25 05:38:57','2019-09-25 06:31:17','г. Ошава (Канада)',NULL,NULL),(10,'2019-09-25 05:39:04','2019-09-25 06:31:17','г. Лондон (Канада)',NULL,NULL),(11,'2019-09-25 05:39:13','2019-09-25 06:31:17','г. Ванкувер, г. Виктория, г. Калгари  (Канада)',NULL,NULL),(12,'2019-09-25 05:39:34','2019-09-25 06:31:17','г. Торонто и г. Ванкувер (Канада)',NULL,NULL),(13,'2019-09-25 05:39:43','2019-09-25 06:31:17','г. Лейкфилд (Канада)',NULL,NULL),(14,'2019-09-25 05:39:52','2019-09-25 05:39:52','провинция Онтарио (Канада)',NULL,NULL),(15,'2019-09-24 18:00:00','2019-09-25 06:31:17','г. Ньюмаркет (Канада)',NULL,NULL),(16,'2019-09-25 05:40:15','2019-09-25 06:31:17','г. Виктория (Канада)',NULL,NULL),(17,'2019-09-25 05:40:40','2019-09-25 06:31:17','г. Калгари  (Канада)',NULL,NULL),(18,'2019-09-25 05:40:55','2019-09-25 06:31:17','г. Камлупс (Канада)',NULL,NULL),(19,'2019-09-25 05:41:02','2019-09-25 06:31:17','г. Питерборо (Канада)',NULL,NULL),(20,'2019-09-25 05:41:08','2019-09-25 06:31:17','г. Порт-Хоуп (Канада)',NULL,NULL),(24,'2019-10-04 02:38:43','2019-10-04 02:38:43','г. Энсхеде (Нидерла́нды)',NULL,NULL),(25,'2019-10-04 02:38:43','2019-10-04 02:38:43','г. Гаага (Нидерла́нды)',NULL,NULL),(26,'2019-10-04 02:38:43','2019-11-13 03:19:27',' г.Тэджон (Южная Корея)',NULL,NULL),(27,'2019-10-04 02:38:43','2019-10-04 02:38:43','г. Измир, Турция',NULL,NULL),(28,'2019-10-04 02:38:43','2019-11-13 06:18:53','г. Стамбул, Турция',NULL,NULL),(29,'2019-10-04 02:38:43','2019-10-04 02:38:43','г. Анкара, Турция',NULL,NULL);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `msg` varchar(2000) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log`
--

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
INSERT INTO `log` VALUES (1,'Адрес загружаемой страницы: http://localhost/learn/?page_id=86#','2019-11-21 04:19:40'),(2,'Текущая страница: Const.URL.SEARCH_MANAGEMENT','2019-11-21 04:19:40'),(3,'URL.SEARCH: http://localhost/learn/?page_id=94','2019-11-21 04:19:40'),(4,'URL.SEARCH_MANAGEMENT: http://localhost/learn/?page_id=86','2019-11-21 04:19:40'),(5,'URL.SEARCH_RESULTS: http://localhost/learn/?page_id=81','2019-11-21 04:19:40'),(6,'Загружено стран: 13','2019-11-21 04:19:45'),(7,'Получение значения \"4\" из local storage для dropdown \"country\"..','2019-11-21 04:19:45'),(8,'Установка dropdown \"country\" в значение \"4\"','2019-11-21 04:19:45'),(9,'Загружено специальностей: 15','2019-11-21 04:19:45'),(10,'Установка поля \"country\" в значение \"4\"..','2019-11-21 04:19:45'),(11,'Получение значения \"0\" из local storage для dropdown \"specialty\"..','2019-11-21 04:19:45'),(12,'Установка dropdown \"specialty\" в значение \"0\"','2019-11-21 04:19:48'),(13,'Установка поля \"specialty\" в значение \"0\"..','2019-11-21 04:19:48'),(14,'Получение значения \"0\" из local storage для dropdown \"language\"..','2019-11-21 04:19:48'),(15,'Установка поля \"language\" в значение \"0\"..','2019-11-21 04:19:48'),(16,'Загружено языков: 2','2019-11-21 04:19:48'),(17,'Установка dropdown \"language\" в значение \"0\"','2019-11-21 04:19:48'),(18,'Загружено программ обучения: 11','2019-11-21 04:19:50'),(19,'Получение значения \"0\" из local storage для dropdown \"program\"..','2019-11-21 04:19:50'),(20,'Загружено местоположений: 27','2019-11-21 04:19:50'),(21,'Установка поля \"program\" в значение \"0\"..','2019-11-21 04:19:50'),(22,'Установка dropdown \"program\" в значение \"0\"','2019-11-21 04:19:50'),(23,'Загружено университетов: 45','2019-11-21 04:19:50'),(24,'Загружено типов: 6','2019-11-21 04:19:52'),(25,'Установка dropdown \"dropdownUnivCountry\" в значение \"1\"','2019-11-21 04:20:19'),(26,'Установка поля \"inpUnivUrl\" в значение \"https://globusedu.kz/canada/brock-university/\"..','2019-11-21 04:20:19'),(27,'Установка поля \"inpUnivName\" в значение \"Brock University\"..','2019-11-21 04:20:19'),(28,'Установка поля \"dropdownUnivCountry\" в значение \"1\"..','2019-11-21 04:20:21'),(29,'Установка поля \"dropdownUnivType\" в значение \"1\"..','2019-11-21 04:20:21'),(30,'Установка dropdown \"dropdownUnivType\" в значение \"1\"','2019-11-21 04:20:21'),(31,'Установка поля \"inpUnivUrlPhoto\" в значение \"https://globusedu.kz/wp-content/uploads/2019/09/Brock-University.jpg\"..','2019-11-21 04:20:21'),(32,'Установка поля \"inpUnivFound\" в значение \"1964\"..','2019-11-21 04:20:21'),(33,'Установка dropdown \"dropdownUnivLoc\" в значение \"1\"','2019-11-21 04:20:26'),(34,'Установка поля \"dropdownUnivLoc\" в значение \"1\"..','2019-11-21 04:20:26'),(35,'Получение значения поля \"dropdownUnivLoc\"..','2019-11-21 04:20:55'),(36,'Получение значения поля \"inpUnivFound\"..','2019-11-21 04:20:55'),(37,'Получение значения поля \"dropdownUnivCountry\"..','2019-11-21 04:20:55'),(38,'Получение значения поля \"dropdownUnivType\"..','2019-11-21 04:20:55'),(39,'Получение значения поля \"inpUnivUrl\"..','2019-11-21 04:20:55'),(40,'Получение значения поля \"inpUnivName\"..','2019-11-21 04:20:55'),(41,'Получение значения поля \"inpUnivUrlPhoto\"..','2019-11-21 04:20:58'),(42,'Университет и связки успешно обновлены. [object Object]','2019-11-21 04:21:00'),(43,'Установка поля \"inpUnivUrl\" в значение \"\"..','2019-11-21 04:21:02'),(44,'Установка поля \"inpUnivName\" в значение \"\"..','2019-11-21 04:21:02'),(45,'Установка поля \"inpUnivFound\" в значение \"\"..','2019-11-21 04:21:02'),(46,'Установка dropdown \"dropdownUnivCountry\" в значение \"0\"','2019-11-21 04:21:02'),(47,'Установка поля \"inpUnivUrlPhoto\" в значение \"\"..','2019-11-21 04:21:02'),(48,'Установка поля \"dropdownUnivCountry\" в значение \"0\"..','2019-11-21 04:21:02'),(49,'Установка dropdown \"dropdownUnivType\" в значение \"0\"','2019-11-21 04:21:04'),(50,'Установка dropdown \"dropdownUnivLoc\" в значение \"0\"','2019-11-21 04:21:04'),(51,'Установка dropdown \"dropdownUnivPrg\" в значение \"0\"','2019-11-21 04:21:04'),(52,'Установка поля \"dropdownUnivLoc\" в значение \"0\"..','2019-11-21 04:21:04'),(53,'Установка поля \"dropdownUnivType\" в значение \"0\"..','2019-11-21 04:21:04'),(54,'Установка поля \"dropdownUnivPrg\" в значение \"0\"..','2019-11-21 04:21:05'),(55,'Установка dropdown \"dropdownUnivLang\" в значение \"0\"','2019-11-21 04:21:06'),(56,'Установка поля \"dropdownUnivLang\" в значение \"0\"..','2019-11-21 04:21:06'),(57,'Установка dropdown \"dropdownUnivSpec\" в значение \"0\"','2019-11-21 04:21:06'),(58,'Установка поля \"dropdownUnivSpec\" в значение \"0\"..','2019-11-21 04:21:06'),(59,'Загружено университетов: 45','2019-11-21 04:21:09'),(60,'URL.SEARCH: http://localhost/learn/?page_id=94','2019-11-21 04:21:45'),(61,'Текущая страница: Const.URL.SEARCH_MANAGEMENT','2019-11-21 04:21:45'),(62,'Адрес загружаемой страницы: http://localhost/learn/?page_id=86#','2019-11-21 04:21:45'),(63,'URL.SEARCH_RESULTS: http://localhost/learn/?page_id=81','2019-11-21 04:21:45'),(64,'URL.SEARCH_MANAGEMENT: http://localhost/learn/?page_id=86','2019-11-21 04:21:45'),(65,'Получение значения \"4\" из local storage для dropdown \"country\"..','2019-11-21 04:21:50'),(66,'Загружено стран: 13','2019-11-21 04:21:50'),(67,'Получение значения \"0\" из local storage для dropdown \"language\"..','2019-11-21 04:21:50'),(68,'Установка поля \"country\" в значение \"4\"..','2019-11-21 04:21:50'),(69,'Установка dropdown \"country\" в значение \"4\"','2019-11-21 04:21:50'),(70,'Загружено языков: 2','2019-11-21 04:21:50'),(71,'Установка dropdown \"language\" в значение \"0\"','2019-11-21 04:21:52'),(72,'Установка dropdown \"program\" в значение \"0\"','2019-11-21 04:21:52'),(73,'Загружено программ обучения: 11','2019-11-21 04:21:52'),(74,'Установка поля \"language\" в значение \"0\"..','2019-11-21 04:21:52'),(75,'Установка поля \"program\" в значение \"0\"..','2019-11-21 04:21:52'),(76,'Получение значения \"0\" из local storage для dropdown \"program\"..','2019-11-21 04:21:52'),(77,'Загружено местоположений: 27','2019-11-21 04:21:55'),(78,'Загружено специальностей: 15','2019-11-21 04:21:55'),(79,'Установка dropdown \"specialty\" в значение \"0\"','2019-11-21 04:21:55'),(80,'Получение значения \"0\" из local storage для dropdown \"specialty\"..','2019-11-21 04:21:55'),(81,'Установка поля \"specialty\" в значение \"0\"..','2019-11-21 04:21:55'),(82,'Загружено типов: 6','2019-11-21 04:21:55'),(83,'Загружено университетов: 45','2019-11-21 04:21:57'),(84,'Установка поля \"inpUnivName\" в значение \"Brock University\"..','2019-11-21 04:22:13'),(85,'Установка dropdown \"dropdownUnivType\" в значение \"1\"','2019-11-21 04:22:13'),(86,'Установка поля \"dropdownUnivType\" в значение \"1\"..','2019-11-21 04:22:13'),(87,'Установка поля \"dropdownUnivCountry\" в значение \"1\"..','2019-11-21 04:22:16'),(88,'Установка поля \"inpUnivUrl\" в значение \"https://globusedu.kz/canada/brock-university/\"..','2019-11-21 04:22:16'),(89,'Установка dropdown \"dropdownUnivCountry\" в значение \"1\"','2019-11-21 04:22:16'),(90,'Установка поля \"inpUnivUrlPhoto\" в значение \"https://globusedu.kz/wp-content/uploads/2019/09/Brock-University.jpg\"..','2019-11-21 04:22:16'),(91,'Установка поля \"inpUnivFound\" в значение \"1964\"..','2019-11-21 04:22:16'),(92,'Установка поля \"dropdownUnivLoc\" в значение \"1\"..','2019-11-21 04:22:21'),(93,'Установка dropdown \"dropdownUnivLoc\" в значение \"1\"','2019-11-21 04:22:21'),(94,'Получение значения поля \"dropdownUnivCountry\"..','2019-11-21 04:22:39'),(95,'Получение значения поля \"inpUnivFound\"..','2019-11-21 04:22:39'),(96,'Получение значения поля \"inpUnivUrl\"..','2019-11-21 04:22:39'),(97,'Получение значения поля \"dropdownUnivLoc\"..','2019-11-21 04:22:39'),(98,'Получение значения поля \"dropdownUnivType\"..','2019-11-21 04:22:39'),(99,'Получение значения поля \"inpUnivName\"..','2019-11-21 04:22:39'),(100,'Получение значения поля \"inpUnivUrlPhoto\"..','2019-11-21 04:22:42'),(101,'Университет и связки успешно обновлены. {\"id\":4,\"name\":\"Brock University\",\"country\":\"1\",\"found\":\"1964\",\"type\":\"1\",\"location\":\"1\",\"url\":\"https://globusedu.kz/canada/brock-university/\",\"url_pic\":\"https://globusedu.kz/wp-content/uploads/2019/09/Brock-University.jpg\",\"programs\":[8,2,3],\"specialities\":[10,2,3,5,11,4],\"languages\":[4]}','2019-11-21 04:22:44'),(102,'Установка dropdown \"dropdownUnivCountry\" в значение \"0\"','2019-11-21 04:22:46'),(103,'Установка поля \"inpUnivUrl\" в значение \"\"..','2019-11-21 04:22:46'),(104,'Установка поля \"inpUnivName\" в значение \"\"..','2019-11-21 04:22:46'),(105,'Установка поля \"inpUnivUrlPhoto\" в значение \"\"..','2019-11-21 04:22:46'),(106,'Установка поля \"inpUnivFound\" в значение \"\"..','2019-11-21 04:22:46'),(107,'Установка поля \"dropdownUnivCountry\" в значение \"0\"..','2019-11-21 04:22:47'),(108,'Установка dropdown \"dropdownUnivType\" в значение \"0\"','2019-11-21 04:22:48'),(109,'Установка поля \"dropdownUnivLoc\" в значение \"0\"..','2019-11-21 04:22:48'),(110,'Установка поля \"dropdownUnivType\" в значение \"0\"..','2019-11-21 04:22:48'),(111,'Установка dropdown \"dropdownUnivLoc\" в значение \"0\"','2019-11-21 04:22:48'),(112,'Установка dropdown \"dropdownUnivPrg\" в значение \"0\"','2019-11-21 04:22:48'),(113,'Установка поля \"dropdownUnivPrg\" в значение \"0\"..','2019-11-21 04:22:49'),(114,'Установка поля \"dropdownUnivSpec\" в значение \"0\"..','2019-11-21 04:22:51'),(115,'Установка dropdown \"dropdownUnivLang\" в значение \"0\"','2019-11-21 04:22:51'),(116,'Установка поля \"dropdownUnivLang\" в значение \"0\"..','2019-11-21 04:22:51'),(117,'Установка dropdown \"dropdownUnivSpec\" в значение \"0\"','2019-11-21 04:22:51'),(118,'Загружено университетов: 45','2019-11-21 04:22:53');
/*!40000 ALTER TABLE `log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program`
--

DROP TABLE IF EXISTS `program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `program` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_ru` varchar(1000) DEFAULT NULL,
  `name_en` varchar(1000) DEFAULT NULL,
  `name_kk` varchar(1000) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program`
--

LOCK TABLES `program` WRITE;
/*!40000 ALTER TABLE `program` DISABLE KEYS */;
INSERT INTO `program` VALUES (1,'среднее образование',NULL,NULL,'2019-10-01 10:18:22','2019-10-01 10:18:22'),(2,'бакалавриат (BA)',NULL,NULL,'2019-10-01 10:18:22','2019-10-01 10:18:22'),(3,'Магистратура и PhD',NULL,NULL,'2019-10-01 10:18:22','2019-10-01 10:18:22'),(4,'подготовка к бакалавриату',NULL,NULL,'2019-10-01 10:18:22','2019-10-01 10:18:22'),(5,'подготовка к магистратуре',NULL,NULL,'2019-10-01 10:18:22','2019-10-01 10:18:22'),(6,'языковые курсы',NULL,NULL,'2019-10-01 10:18:22','2019-10-01 10:18:22'),(7,'каникулярные программы',NULL,NULL,'2019-10-01 10:18:22','2019-10-01 10:18:22'),(8,'академический английский язык',NULL,NULL,'2019-10-01 10:18:22','2019-10-01 10:18:22'),(9,' постдипломные программы',NULL,NULL,'2019-10-01 10:18:22','2019-10-01 10:18:22'),(10,'дипломные и трансферная программы',NULL,NULL,'2019-10-01 10:18:22','2019-10-01 10:18:22');
/*!40000 ALTER TABLE `program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialty`
--

DROP TABLE IF EXISTS `specialty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `specialty` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_ru` varchar(255) DEFAULT NULL,
  `name_en` varchar(255) DEFAULT NULL,
  `name_kk` varchar(255) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialty`
--

LOCK TABLES `specialty` WRITE;
/*!40000 ALTER TABLE `specialty` DISABLE KEYS */;
INSERT INTO `specialty` VALUES (1,'Архитектура и строительство',NULL,NULL,'2019-10-03 03:26:15','2019-10-03 03:26:15'),(2,'Естественные науки',NULL,NULL,'2019-10-03 03:26:15','2019-10-03 03:26:15'),(3,'Искусство, анимация и дизайн',NULL,NULL,'2019-10-03 03:26:15','2019-10-03 03:26:15'),(4,'Социальные или общественные науки',NULL,NULL,'2019-10-03 03:26:15','2019-10-03 03:26:15'),(5,'Медицина и здравоохранение',NULL,NULL,'2019-10-03 03:26:15','2019-10-03 03:26:15'),(6,'Инженеринг',NULL,NULL,'2019-10-03 03:26:15','2019-11-13 03:00:09'),(7,'Бизнес и управление, менеджмент',NULL,NULL,'2019-10-03 03:26:15','2019-10-03 03:26:15'),(8,'Компьютерная наука и программирование',NULL,NULL,'2019-10-03 03:26:15','2019-10-03 03:26:15'),(9,'Туризм, гостиничное дело, кулинария',NULL,NULL,'2019-10-03 03:26:15','2019-10-03 03:26:15'),(10,'Гуманитарные науки',NULL,NULL,'2019-10-03 03:26:15','2019-10-03 03:26:15'),(11,'Педагогика',NULL,NULL,'2019-10-03 03:26:15','2019-10-03 03:26:15'),(12,'Право',NULL,NULL,'2019-10-03 03:26:15','2019-10-03 03:26:15'),(13,'Авиация',NULL,NULL,'2019-10-03 03:26:15','2019-11-14 05:40:50'),(14,'технические специальности',NULL,NULL,'2019-10-03 03:26:15','2019-10-03 03:26:15');
/*!40000 ALTER TABLE `specialty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `university`
--

DROP TABLE IF EXISTS `university`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `university` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_ru` varchar(1000) DEFAULT NULL,
  `name_en` varchar(1000) DEFAULT NULL,
  `name_kk` varchar(1000) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `found` date DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `url` varchar(1000) DEFAULT NULL,
  `url_pic` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `university`
--

LOCK TABLES `university` WRITE;
/*!40000 ALTER TABLE `university` DISABLE KEYS */;
INSERT INTO `university` VALUES (1,NULL,'Algonquin College',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1967-01-01',1,1,'https://globusedu.kz/canada/algonquin-college/','https://globusedu.kz/wp-content/uploads/2019/09/Algonquin-College.jpg'),(2,NULL,'Alexander College',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','2006-01-01',2,2,'https://globusedu.kz/canada/alexander-college/','https://globusedu.kz/wp-content/uploads/2019/09/Alexander-College.jpg'),(3,NULL,'Bodwell High School & College           ',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1991-01-01',2,3,'https://globusedu.kz/canada/bodwell-college-high-school/','https://globusedu.kz/wp-content/uploads/2019/10/Bodwell-High-School.jpg'),(4,NULL,'Brock University',NULL,1,'2019-10-01 08:09:49','2019-11-20 10:40:33','1964-01-01',1,1,'https://globusedu.kz/canada/brock-university/','https://globusedu.kz/wp-content/uploads/2019/09/Brock-University.jpg'),(5,NULL,'Burnaby School District                     ',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1906-01-01',1,5,'https://globusedu.kz/canada/burnaby-school-district/','https://globusedu.kz/wp-content/uploads/2019/10/Burnaby-School-District.jpg'),(6,NULL,'Braemar College                                                 ',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1995-01-01',2,6,'https://globusedu.kz/canada/braemar-college/','https://globusedu.kz/wp-content/uploads/2019/10/Braemar-College.jpg'),(7,NULL,'Branksome Hall',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1903-01-01',2,6,'https://globusedu.kz/canada/branksome-hall/','https://globusedu.kz/wp-content/uploads/2019/10/Branksome-Hall.jpg'),(8,NULL,'Columbia College                              ',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1936-01-01',3,3,'https://globusedu.kz/canada/columbia-college/','https://globusedu.kz/wp-content/uploads/2018/12/Columbia-College-1-e1545226967692.jpg\"'),(9,NULL,'Columbia International College           ',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1979-01-01',2,7,'https://globusedu.kz/canada/columbia-international-college/','https://globusedu.kz/wp-content/uploads/2019/10/Columbia-International-College.jpg'),(10,NULL,'Centennial College                            ',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1966-01-01',1,6,'https://globusedu.kz/canada/centennial-college/','https://globusedu.kz/wp-content/uploads/2019/10/Centennial-College.jpg'),(11,NULL,'Conestoga International College',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1967-01-01',1,8,'https://globusedu.kz/canada/conestoga-international-college/','https://globusedu.kz/wp-content/uploads/2018/05/Conestoga-International-College.jpg'),(12,NULL,'Capilano University',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1968-01-01',1,3,'https://globusedu.kz/canada/capilano-university/','https://globusedu.kz/wp-content/uploads/2019/09/Capilano-University.jpg'),(13,NULL,'Douglas College',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1970-01-01',1,3,'https://globusedu.kz/canada/douglas-college/','https://globusedu.kz/wp-content/uploads/2019/09/Douglas-College.jpg'),(14,NULL,'Durham College ',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1967-01-01',1,9,'https://globusedu.kz/canada/durham-college/','https://globusedu.kz/wp-content/uploads/2018/12/Durham-College2.jpg'),(15,NULL,'Fanshawe College',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1967-01-01',4,10,'https://globusedu.kz/canada/fanshawe-college/','https://globusedu.kz/wp-content/uploads/2019/09/fanshawe_college-1.jpg'),(16,NULL,'Fraser International College (FIC) (Simon Fraser University)',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1965-01-01',1,3,'https://globusedu.kz/canada/fraser-international-college/','https://globusedu.kz/wp-content/uploads/2019/10/Simon-Fraser-University.jpg'),(17,NULL,'George Brown College                        ',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1967-01-01',1,6,'https://globusedu.kz/canada/george-brown-college/','https://globusedu.kz/wp-content/uploads/2018/12/georgebrown.jpg'),(18,NULL,'Global Village English Centres',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1996-01-01',2,11,'https://globusedu.kz/canada/global-village-english-centres/','https://globusedu.kz/wp-content/uploads/2019/10/Global-Village-English-Centres.jpg'),(19,NULL,'International Language Academy of Canada (ILAC)',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1998-01-01',5,12,'https://globusedu.kz/canada/ilac-international-language-academy-of-canada/','https://globusedu.kz/wp-content/uploads/2019/05/ilac.jpg'),(20,NULL,'Humber College',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1967-01-01',1,6,'https://globusedu.kz/canada/humber-college/','https://globusedu.kz/wp-content/uploads/2019/08/humber-college.jpg'),(21,NULL,'Lakefield College School',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1879-01-01',2,13,'https://globusedu.kz/canada/lakefield-college-school/','https://globusedu.kz/wp-content/uploads/2019/10/Lakefield-College-School.jpg'),(22,NULL,'Niagara College                                 ',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1967-01-01',1,14,'https://globusedu.kz/canada/niagara-college/','https://globusedu.kz/wp-content/uploads/2018/12/nc.png'),(23,NULL,'Pickering College',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1842-01-01',2,15,'https://globusedu.kz/canada/pickering-college/','https://globusedu.kz/wp-content/uploads/2019/10/Pickering-College.jpg'),(24,NULL,'Royal Roads University',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1995-01-01',1,16,'https://globusedu.kz/canada/royal-roads-university/','https://globusedu.kz/wp-content/uploads/2019/09/Royal-Roads-University.jpg'),(25,NULL,'Rutherford Canadian School                      ',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','2003-01-01',2,6,'https://globusedu.kz/canada/rutherford-canadian-school/','https://globusedu.kz/wp-content/uploads/2019/09/Rutherford-Canadian-School.jpg'),(26,NULL,'SAIT Polytechnic',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1926-01-01',1,17,'https://globusedu.kz/canada/sait/','https://globusedu.kz/wp-content/uploads/2019/09/SAIT-Polytechnic.jpg'),(27,NULL,'St.Lawrence College',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1879-01-01',1,14,'https://globusedu.kz/canada/st-lawrence-college/','https://globusedu.kz/wp-content/uploads/2018/12/st-lawrence-college.jpg'),(28,NULL,'Seneca College                                 ',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1967-01-01',1,6,'https://globusedu.kz/canada/seneca-college/','https://globusedu.kz/wp-content/uploads/2019/10/Seneca-College.jpg'),(29,NULL,'Sheridan College',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1967-01-01',1,14,'https://globusedu.kz/canada/sheridan-college/','https://globusedu.kz/wp-content/uploads/2019/09/Sheridan-College.jpg'),(30,NULL,'Thompson Rivers University                ',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1970-01-01',1,18,'https://globusedu.kz/canada/thompson-rivers-university/','https://globusedu.kz/wp-content/uploads/2018/12/Thompson-Rivers-University.jpg'),(32,NULL,'Trinity College School',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1865-01-01',2,20,'https://globusedu.kz/canada/trinity-college-school/','https://globusedu.kz/wp-content/uploads/2019/10/Trinity-College-School.jpg'),(33,NULL,'University of Victoria',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1963-01-01',1,16,'https://globusedu.kz/canada/victoriauniversity/','https://globusedu.kz/wp-content/uploads/2018/11/uni_victoria.jpg'),(34,NULL,'University of Guelph',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1964-01-01',1,21,'https://globusedu.kz/canada/university-of-guelph/','https://globusedu.kz/wp-content/uploads/2019/10/University-of-Guelph.jpg'),(35,NULL,'University of British Columbia ( UBC)',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1908-01-01',1,3,'https://globusedu.kz/canada/university_of_british_columbia/','https://globusedu.kz/wp-content/uploads/2018/12/ubc.jpg'),(36,NULL,'International College of Manitoba (ICM) (University of Manitoba)',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1877-01-01',1,22,'https://globusedu.kz/canada/international-college-of-manitoba/','https://globusedu.kz/wp-content/uploads/2019/10/Columbia-International-College-1.jpg'),(37,NULL,'University of Toronto',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','1827-01-01',1,6,'https://globusedu.kz/canada/university-of-toronto/','https://globusedu.kz/wp-content/uploads/2019/10/University-of-Toronto.jpg'),(38,NULL,'UBC Vantage College                          ',NULL,1,'2019-10-01 08:09:49','2019-10-01 08:09:49','2014-01-01',1,23,'https://globusedu.kz/canada/vantage-college/','https://globusedu.kz/wp-content/uploads/2019/10/UBC-Vantage-College.jpg'),(39,NULL,'University of Twente',NULL,2,'2019-10-04 03:14:10','2019-10-04 03:14:10','1961-01-01',1,24,'https://globusedu.kz/netherlands/university-of-twente/','https://globusedu.kz/wp-content/uploads/2018/11/University-of-Twente.jpg'),(40,NULL,'Hague University of Applied Sciences',NULL,2,'2019-10-04 03:14:10','2019-10-04 03:14:10','1987-01-01',1,24,'https://globusedu.kz/netherlands/hague-university-of-applied-sciences/','https://globusedu.kz/wp-content/uploads/2019/05/THPC_THUAS_slide3.jpg'),(41,NULL,'Solbridge International School of Business',NULL,11,'2019-10-04 02:52:52','2019-10-04 02:52:52','2001-01-20',2,26,'https://globusedu.kz/korea/solbridge-international-school-of-business/','https://globusedu.kz/wp-content/uploads/2018/04/solbridge_international_school_of_business1.jpg'),(42,NULL,'İzmir University of Economics',NULL,7,'2019-10-04 02:52:52','2019-10-04 02:52:52','2001-01-20',2,27,'https://globusedu.kz/turkey/izmir-university-of-economics/','https://globusedu.kz/wp-content/uploads/2018/04/izmir-uni-2.jpg'),(43,NULL,'Bahcesehir University',NULL,7,'2019-10-04 03:14:10','2019-10-04 03:14:10','1998-01-01',2,28,'https://globusedu.kz/netherlands/university-of-twente/','https://globusedu.kz/wp-content/uploads/2018/04/Bahcesehir_University_logo.png'),(44,NULL,'Atılım University',NULL,7,'2019-10-04 03:14:10','2019-10-04 03:14:10','1997-01-01',2,29,'https://globusedu.kz/turkey/atilim-university/','https://globusedu.kz/wp-content/uploads/2018/04/Atılım_University.jpg'),(65,NULL,'КазНТУ',NULL,1,'2019-11-19 06:30:04','2019-11-19 06:30:04','1988-01-01',1,3,'http','http');
/*!40000 ALTER TABLE `university` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `university_languages`
--

DROP TABLE IF EXISTS `university_languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `university_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `language_id` int(11) DEFAULT NULL,
  `university_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `university_languages`
--

LOCK TABLES `university_languages` WRITE;
/*!40000 ALTER TABLE `university_languages` DISABLE KEYS */;
INSERT INTO `university_languages` VALUES (1,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,1),(2,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,2),(3,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,3),(5,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,5),(6,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,6),(7,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,7),(8,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,8),(9,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,9),(10,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,10),(11,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,11),(12,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,12),(13,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,13),(14,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,14),(15,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,15),(16,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,16),(17,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,17),(18,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,18),(19,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,19),(20,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,20),(21,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,21),(22,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,22),(23,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,23),(24,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,24),(25,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,25),(26,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,26),(27,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,27),(28,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,28),(29,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,29),(30,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,30),(31,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,31),(32,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,32),(33,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,33),(34,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,34),(35,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,35),(36,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,36),(37,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,37),(38,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,38),(39,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,39),(40,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,40),(41,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,41),(42,'2019-09-25 06:20:52','2019-09-25 06:20:52',4,42),(43,'2019-10-04 04:15:39','2019-10-04 04:15:39',4,43),(44,'2019-10-04 04:15:39','2019-10-04 04:15:39',4,44),(45,'2019-11-19 05:26:07','2019-11-19 05:26:07',4,64),(46,'2019-11-19 06:30:04','2019-11-19 06:30:04',4,65),(54,'2019-11-21 04:22:42','2019-11-21 04:22:42',4,4);
/*!40000 ALTER TABLE `university_languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `university_programs`
--

DROP TABLE IF EXISTS `university_programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `university_programs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `university_id` int(11) DEFAULT NULL,
  `program_id` int(11) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `university_programs`
--

LOCK TABLES `university_programs` WRITE;
/*!40000 ALTER TABLE `university_programs` DISABLE KEYS */;
INSERT INTO `university_programs` VALUES (1,1,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(2,1,8,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(3,1,9,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(4,2,8,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(5,2,10,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(6,3,1,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(10,5,1,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(11,6,1,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(12,7,1,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(13,8,1,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(14,8,8,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(15,8,10,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(16,9,1,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(17,9,4,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(18,10,10,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(19,10,9,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(20,10,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(21,11,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(22,11,8,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(23,11,10,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(24,12,10,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(25,12,9,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(26,12,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(27,12,4,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(28,13,10,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(29,13,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(30,13,3,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(31,14,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(32,14,8,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(33,14,10,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(34,15,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(35,15,10,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(36,15,8,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(37,16,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(38,16,4,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(39,16,5,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(40,16,8,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(41,17,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(42,17,10,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(43,17,9,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(44,18,6,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(45,19,4,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(46,19,6,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(47,20,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(48,20,10,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(49,20,8,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(50,21,1,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(51,22,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(52,22,8,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(53,22,9,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(54,22,10,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(55,23,1,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(56,23,8,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(57,24,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(58,24,3,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(59,24,8,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(60,24,10,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(61,25,1,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(62,25,4,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(63,25,8,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(64,26,4,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(65,26,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(66,26,10,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(67,27,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(68,27,10,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(69,27,8,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(70,28,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(71,28,10,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(72,28,9,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(73,28,8,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(74,29,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(75,29,8,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(76,29,10,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(77,30,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(78,30,3,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(79,30,10,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(80,31,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(81,31,3,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(82,31,8,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(83,31,10,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(84,32,1,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(85,33,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(86,33,3,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(87,34,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(88,34,3,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(89,34,8,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(90,35,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(91,35,3,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(92,36,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(93,36,4,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(94,36,8,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(95,37,2,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(96,37,3,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(97,37,4,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(98,38,10,'2019-10-01 10:06:51','2019-10-01 10:06:51'),(99,39,2,'2019-10-04 02:42:24','2019-10-04 05:18:44'),(100,39,4,'2019-10-04 02:42:24','2019-10-04 02:42:24'),(101,40,2,'2019-10-04 02:42:24','2019-10-04 05:18:44'),(102,40,4,'2019-10-04 02:42:24','2019-10-04 02:42:24'),(103,41,7,'2019-10-04 02:42:24','2019-10-04 02:42:24'),(104,41,2,'2019-10-04 02:42:24','2019-10-04 02:42:24'),(105,41,3,'2019-10-04 02:42:24','2019-10-04 02:42:24'),(106,42,2,'2019-10-04 02:42:24','2019-10-04 02:42:24'),(107,42,3,'2019-10-04 02:42:24','2019-10-04 02:42:24'),(108,43,2,'2019-10-04 02:42:24','2019-10-04 02:42:24'),(109,43,3,'2019-10-04 02:42:24','2019-10-04 02:42:24'),(110,44,2,'2019-10-04 02:42:24','2019-10-04 02:42:24'),(111,44,3,'2019-10-04 02:42:24','2019-10-04 02:42:24'),(112,64,8,'2019-11-19 05:26:07','2019-11-19 05:26:07'),(113,64,10,'2019-11-19 05:26:07','2019-11-19 05:26:07'),(114,64,1,'2019-11-19 05:26:07','2019-11-19 05:26:07'),(115,65,8,'2019-11-19 06:30:04','2019-11-19 06:30:04'),(137,4,8,'2019-11-21 04:22:42','2019-11-21 04:22:42'),(138,4,2,'2019-11-21 04:22:42','2019-11-21 04:22:42'),(139,4,3,'2019-11-21 04:22:42','2019-11-21 04:22:42');
/*!40000 ALTER TABLE `university_programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `university_specialities`
--

DROP TABLE IF EXISTS `university_specialities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `university_specialities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `university_id` int(11) DEFAULT NULL,
  `specialty_id` int(11) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=272 DEFAULT CHARSET=utf8 AVG_ROW_LENGTH=682;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `university_specialities`
--

LOCK TABLES `university_specialities` WRITE;
/*!40000 ALTER TABLE `university_specialities` DISABLE KEYS */;
INSERT INTO `university_specialities` VALUES (1,1,4,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(2,1,3,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(3,1,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(4,1,14,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(5,1,6,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(6,1,1,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(7,1,8,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(8,1,9,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(9,1,5,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(10,1,2,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(11,2,2,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(12,2,10,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(13,2,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(14,2,6,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(15,2,8,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(22,8,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(23,8,8,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(24,8,6,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(25,8,2,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(26,8,10,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(27,8,4,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(28,10,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(29,10,14,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(30,10,6,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(31,10,13,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(32,10,9,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(33,10,3,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(34,10,5,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(35,10,8,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(36,10,4,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(37,10,2,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(38,11,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(39,11,6,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(40,11,8,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(41,11,4,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(42,11,14,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(43,11,3,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(44,11,2,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(45,11,5,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(46,11,9,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(47,12,10,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(48,12,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(49,12,9,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(50,12,5,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(51,12,2,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(52,12,6,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(53,12,3,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(54,13,4,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(55,13,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(56,13,5,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(57,13,10,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(58,13,2,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(59,14,9,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(60,14,8,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(61,14,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(62,14,4,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(63,14,14,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(64,14,5,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(65,14,3,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(66,15,2,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(67,15,10,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(68,15,6,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(69,15,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(70,15,3,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(71,15,8,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(72,15,9,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(73,16,10,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(74,16,4,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(75,16,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(76,16,6,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(77,16,8,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(78,16,2,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(79,16,5,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(80,16,3,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(81,17,3,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(82,17,8,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(83,17,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(84,17,14,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(85,17,11,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(86,17,6,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(87,17,5,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(88,17,9,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(89,20,3,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(90,20,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(91,20,5,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(92,20,9,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(93,20,14,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(94,20,4,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(95,22,9,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(96,22,8,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(97,22,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(98,22,4,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(99,22,14,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(100,22,2,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(101,22,10,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(102,24,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(103,24,11,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(104,24,2,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(105,24,10,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(106,24,4,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(107,24,9,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(108,24,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(109,26,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(110,26,1,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(111,26,9,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(112,26,5,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(113,26,14,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(114,26,8,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(115,26,4,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(116,27,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(117,27,4,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(118,27,8,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(119,27,5,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(120,27,9,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(121,27,12,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(122,27,14,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(123,27,3,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(124,28,3,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(125,28,13,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(126,28,6,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(127,28,9,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(128,28,8,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(129,28,2,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(130,28,10,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(131,28,4,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(132,28,14,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(133,29,5,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(134,29,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(135,29,3,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(136,29,4,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(137,29,10,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(138,29,14,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(139,29,11,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(140,30,2,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(141,30,10,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(142,30,4,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(143,30,11,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(144,30,12,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(145,30,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(146,30,9,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(147,30,5,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(148,30,14,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(149,31,2,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(150,31,10,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(151,31,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(152,31,4,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(153,31,8,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(154,33,11,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(155,33,6,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(156,33,3,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(157,33,2,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(158,33,4,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(159,33,10,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(160,33,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(161,33,12,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(162,34,2,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(163,34,6,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(164,34,4,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(165,34,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(166,35,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(167,35,6,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(168,35,11,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(169,35,2,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(170,35,5,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(171,35,12,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(172,35,10,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(173,35,4,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(174,36,2,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(175,36,6,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(176,36,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(177,36,8,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(178,37,6,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(179,37,1,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(180,37,2,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(181,37,10,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(182,37,5,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(183,37,8,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(184,37,4,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(185,37,11,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(186,37,12,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(187,38,10,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(188,38,2,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(189,38,6,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(190,38,7,'2019-10-03 03:27:46','2019-10-03 03:27:46'),(191,39,1,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(192,39,8,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(193,39,7,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(194,39,6,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(195,39,4,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(196,40,6,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(197,40,7,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(198,41,7,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(199,42,6,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(200,42,8,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(201,42,7,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(202,42,3,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(203,42,4,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(204,42,19,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(205,42,5,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(206,42,12,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(207,43,1,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(208,43,3,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(209,43,4,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(210,43,2,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(211,43,6,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(212,43,11,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(213,44,2,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(214,44,10,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(215,44,12,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(216,44,7,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(217,44,6,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(218,44,5,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(219,44,13,'2019-10-04 02:40:17','2019-10-04 02:40:17'),(220,64,2,'2019-11-19 05:26:07','2019-11-19 05:26:07'),(221,64,5,'2019-11-19 05:26:07','2019-11-19 05:26:07'),(222,64,9,'2019-11-19 05:26:07','2019-11-19 05:26:07'),(223,65,7,'2019-11-19 06:30:04','2019-11-19 06:30:04'),(266,4,10,'2019-11-21 04:22:42','2019-11-21 04:22:42'),(267,4,2,'2019-11-21 04:22:42','2019-11-21 04:22:42'),(268,4,3,'2019-11-21 04:22:42','2019-11-21 04:22:42'),(269,4,5,'2019-11-21 04:22:42','2019-11-21 04:22:42'),(270,4,11,'2019-11-21 04:22:42','2019-11-21 04:22:42'),(271,4,4,'2019-11-21 04:22:42','2019-11-21 04:22:42');
/*!40000 ALTER TABLE `university_specialities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `university_type`
--

DROP TABLE IF EXISTS `university_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `university_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name_ru` varchar(255) DEFAULT NULL,
  `name_en` varchar(255) DEFAULT NULL,
  `name_kk` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `university_type`
--

LOCK TABLES `university_type` WRITE;
/*!40000 ALTER TABLE `university_type` DISABLE KEYS */;
INSERT INTO `university_type` VALUES (1,'2019-09-25 05:17:49','2019-09-25 05:17:49','государственный',NULL,NULL),(2,'2019-09-25 05:18:03','2019-09-25 05:18:03','частный',NULL,NULL),(3,'2019-09-25 05:18:17','2019-09-25 05:18:17','независимый',NULL,NULL),(4,'2019-09-25 05:18:27','2019-09-25 05:18:27','общеобразовательный колледж',NULL,NULL),(5,'2019-09-25 05:18:39','2019-09-25 05:18:39','языковая школа',NULL,NULL);
/*!40000 ALTER TABLE `university_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'learn'
--
/*!50003 DROP PROCEDURE IF EXISTS `add_univ` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`globu_wordpres_6`@`localhost` PROCEDURE `add_univ`(IN name VARCHAR(255), IN country_id INT, IN found VARCHAR(255), IN type_id INT, IN location_id INT, IN url VARCHAR(1000), IN url_pic VARCHAR(1000))
    SQL SECURITY INVOKER
BEGIN
  insert into university (name_en, country_id, found, type_id, location_id, url, url_pic)
    values (name, country_id, MAKEDATE(found, 1), type_id, location_id, url, url_pic);
  select LAST_INSERT_ID() id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `search` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`globu_wordpres_6`@`localhost` PROCEDURE `search`(IN countryId INT, IN programId INT, IN specialtyId INT, IN languageId INT)
    SQL SECURITY INVOKER
BEGIN
  set @q = 'select u.id, u.name_en \'name\', u.found, ut.name_ru \'type\', lc.name_ru \'location\', u.url, u.url_pic,
     (select GROUP_CONCAT(ll.name_ru SEPARATOR \', \') from university_languages ul 
          left join language ll on ll.id = ul.language_id 
      where ul.university_id = u.id 
         group by ul.university_id) \'languages\', 
    (select GROUP_CONCAT(pp.name_ru SEPARATOR \', \') from university_programs up1 
          left join program pp on pp.id = up1.program_id 
     where up1.university_id = u.id 
        group by up1.university_id) \'programs\' 
  from university u 
    left join location lc on lc.id = u.location_id 
    left join university_type ut on ut.id = u.type_id';
  if countryId <> 0 then
    set @q = concat(@q, ' ', 'where u.country_id = ', countryId);
  end if;
  if programId <> 0 then
    if countryId = 0 then
      set @q = concat(@q, ' ', 'where');
    else
       set @q = concat(@q, ' ', 'and');
    end if;
    set @q = concat(@q, ' ', 'EXISTS (
      select * from university_programs up 
      where 
        up.university_id = u.id 
        and up.program_id = ', programId, ')');
  end if;
  if specialtyId <> 0 then
    if countryId = 0 and programId = 0 then
      set @q = concat(@q, ' ', 'where');
    end if;
    if countryId <> 0 or programId <> 0 then
      set @q = concat(@q, ' ', 'and');
    end if;
    set @q = concat(@q, ' ', 'exists (
      select * from university_specialities us
      WHERE 
        us.university_id = u.id
        and us.specialty_id = ', specialtyId ,')');
  end if;
  if languageId <> 0 then
    if countryId = 0 and programId = 0 and specialtyId = 0 then
      set @q = concat(@q, ' ', 'where');
    end if;
    if countryId <> 0 or programId <> 0 or specialtyId <> 0 then
      set @q = concat(@q, ' ', 'and');
    end if;
    set @q = concat(@q, ' ', 'exists (
      select * from university_languages ul
      WHERE 
        ul.university_id = u.id
        and ul.language_id = ', languageId ,')');
  end if;
  set @q = concat(@q, ' ', 'order by u.name_en asc;');
  insert into log (msg) values (@q);
  PREPARE dynamic_statement FROM @q;
  EXECUTE dynamic_statement;
  DEALLOCATE PREPARE dynamic_statement;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_univ` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`globu_wordpres_6`@`localhost` PROCEDURE `update_univ`(IN id INT, IN name VARCHAR(255), IN country_id INT, IN found VARCHAR(255), IN type_id INT, IN location_id INT, IN url VARCHAR(1000), IN url_pic VARCHAR(1000))
    SQL SECURITY INVOKER
BEGIN
  update university u set 
    u.name_en = name, 
    u.country_id = country_id,
    u.found = MAKEDATE(found, 1),
    u.type_id = type_id,
    u.location_id = location_id,
    u.url = url,
    u.url_pic = url_pic
  WHERE 
    u.id = id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-21 10:53:12
