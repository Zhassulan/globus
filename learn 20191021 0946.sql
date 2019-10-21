﻿--
-- Script was generated by Devart dbForge Studio 2019 for MySQL, Version 8.2.23.0
-- Product home page: http://www.devart.com/dbforge/mysql/studio
-- Script date 21.10.2019 9:46:57
-- Server version: 5.7.23
-- Client version: 4.1
--

-- 
-- Disable foreign keys
-- 
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

-- 
-- Set SQL mode
-- 
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 
-- Set character set the client will use to send SQL statements to the server
--
SET NAMES 'utf8';

--
-- Set default database
--
USE learn;

--
-- Drop procedure `search`
--
DROP PROCEDURE IF EXISTS search;

--
-- Drop table `country`
--
DROP TABLE IF EXISTS country;

--
-- Drop table `language`
--
DROP TABLE IF EXISTS language;

--
-- Drop table `location`
--
DROP TABLE IF EXISTS location;

--
-- Drop table `log`
--
DROP TABLE IF EXISTS log;

--
-- Drop table `program`
--
DROP TABLE IF EXISTS program;

--
-- Drop table `specialty`
--
DROP TABLE IF EXISTS specialty;

--
-- Drop table `university`
--
DROP TABLE IF EXISTS university;

--
-- Drop table `university_languages`
--
DROP TABLE IF EXISTS university_languages;

--
-- Drop table `university_programs`
--
DROP TABLE IF EXISTS university_programs;

--
-- Drop table `university_specialities`
--
DROP TABLE IF EXISTS university_specialities;

--
-- Drop table `university_type`
--
DROP TABLE IF EXISTS university_type;

--
-- Set default database
--
USE learn;

--
-- Create table `university_type`
--
CREATE TABLE university_type (
  id INT(11) NOT NULL AUTO_INCREMENT,
  created TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  name_ru VARCHAR(255) DEFAULT NULL,
  name_en VARCHAR(255) DEFAULT NULL,
  name_kk VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 6,
AVG_ROW_LENGTH = 4096,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Create table `university_specialities`
--
CREATE TABLE university_specialities (
  id INT(11) NOT NULL AUTO_INCREMENT,
  university_id INT(11) DEFAULT NULL,
  specialty_id INT(11) DEFAULT NULL,
  created TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 220,
AVG_ROW_LENGTH = 682,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Create table `university_programs`
--
CREATE TABLE university_programs (
  id INT(11) NOT NULL AUTO_INCREMENT,
  university_id INT(11) DEFAULT NULL,
  program_id INT(11) DEFAULT NULL,
  created TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 112,
AVG_ROW_LENGTH = 147,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Create table `university_languages`
--
CREATE TABLE university_languages (
  id INT(11) NOT NULL AUTO_INCREMENT,
  created TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  language_id INT(11) DEFAULT NULL,
  university_id INT(11) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 45,
AVG_ROW_LENGTH = 390,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Create table `university`
--
CREATE TABLE university (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name_ru VARCHAR(1000) DEFAULT NULL,
  name_en VARCHAR(1000) DEFAULT NULL,
  name_kk VARCHAR(1000) DEFAULT NULL,
  country_id INT(11) DEFAULT NULL,
  created TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  found DATE DEFAULT NULL,
  type_id INT(11) DEFAULT NULL,
  location_id INT(11) DEFAULT NULL,
  url VARCHAR(1000) DEFAULT NULL,
  url_pic VARCHAR(1000) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 45,
AVG_ROW_LENGTH = 372,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Create table `specialty`
--
CREATE TABLE specialty (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name_ru VARCHAR(255) DEFAULT NULL,
  name_en VARCHAR(255) DEFAULT NULL,
  name_kk VARCHAR(255) DEFAULT NULL,
  created TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 15,
AVG_ROW_LENGTH = 1170,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Create table `program`
--
CREATE TABLE program (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name_ru VARCHAR(1000) DEFAULT NULL,
  name_en VARCHAR(1000) DEFAULT NULL,
  name_kk VARCHAR(1000) DEFAULT NULL,
  created TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 11,
AVG_ROW_LENGTH = 1638,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Create table `log`
--
CREATE TABLE log (
  id INT(11) NOT NULL AUTO_INCREMENT,
  msg VARCHAR(2000) DEFAULT NULL,
  created TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 77,
AVG_ROW_LENGTH = 1310,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Create table `location`
--
CREATE TABLE location (
  id INT(11) NOT NULL AUTO_INCREMENT,
  created TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  name_ru VARCHAR(255) DEFAULT NULL,
  name_en VARCHAR(255) DEFAULT NULL,
  name_kk VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 30,
AVG_ROW_LENGTH = 655,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Create table `language`
--
CREATE TABLE language (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name_ru VARCHAR(50) DEFAULT NULL,
  name_en VARCHAR(255) DEFAULT NULL,
  name_kk VARCHAR(255) DEFAULT NULL,
  created TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 5,
AVG_ROW_LENGTH = 8192,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Create table `country`
--
CREATE TABLE country (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name_ru VARCHAR(255) DEFAULT NULL,
  name_en VARCHAR(255) DEFAULT NULL,
  name_kk VARCHAR(255) DEFAULT NULL,
  created TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  modified TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 14,
AVG_ROW_LENGTH = 1260,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

DELIMITER $$

--
-- Create procedure `search`
--
CREATE PROCEDURE search(IN countryId INT, IN programId INT, IN specialtyId INT, IN languageId INT)
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
INSERT INTO log (msg)
  VALUES (@q);
  PREPARE dynamic_statement FROM @q;
  EXECUTE dynamic_statement;
  DEALLOCATE PREPARE dynamic_statement;
END
$$

DELIMITER ;

-- 
-- Restore previous SQL mode
-- 
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

-- 
-- Enable foreign keys
-- 
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;