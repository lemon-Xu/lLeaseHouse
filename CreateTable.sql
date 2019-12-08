-- Lemon 
CREATE TABLE Users(
	Users_ID INT AUTO_INCREMENT COMMENT '用户ID', 
	Users_Name VARCHAR(20) NOT NULL COMMENT '用户昵称',
	Users_Account VARCHAR(20) NOT NULL COMMENT '用户账户',
	Users_PassWord VARCHAR(128) NOT NULL COMMENT '用户密码 MD5加密',
	Users_Email VARCHAR(40) COMMENT '用户邮箱',
	Users_Rank VARCHAR(20) NOT NULL DEFAULT '游客' COMMENT '会员等级',
	Users_Profile VARCHAR(400) COMMENT '用户简介',
  Users_Phone VARCHAR(30) COMMENT '用户联系方式',
	Users_IsBan INT NOT NULL DEFAULT 0 COMMENT '被屏蔽, 1被屏蔽',
	PRIMARY KEY(Users_ID),
	UNIQUE KEY(Users_Name),
	UNIQUE KEY(Users_Account),
	UNIQUE KEY(Users_Email)
) AUTO_INCREMENT = 1;

INSERT INTO Users (Users_Name, Users_Account, Users_PassWord, Users_Email,Users_Rank) VALUES 
('游客1', 'X122',MD5('12'), '12@qq.com','游客'),
('租客1', 'x1234',MD5('1234'), 'x1234@qq.coom','V0'),
('房东1', 'x123', MD5('123'), 'x123@qq.com','V10');


-- lemon
CREATE TABLE Administrator(
	Adm_ID INT NOT NULL AUTO_INCREMENT COMMENT '管理员ID',
	Adm_Account VARCHAR(20) NOT NULL COMMENT '管理员账户',
	Adm_PassWord VARCHAR(128) NOT NULL COMMENT '管理员 MD5加密',
	Adm_Email VARCHAR(40) COMMENT '管理员邮箱',
	Administrator_IsBan INT NOT NULL DEFAULT 0 COMMENT '屏蔽',
	PRIMARY KEY(Adm_ID),
	UNIQUE KEY(Adm_Account),
	UNIQUE KEY(Adm_Email)
) AUTO_INCREMENT = 1;

INSERT INTO Administrator(Adm_Account, Adm_PassWord) VALUES
('root',MD5('root'));

-- first
CREATE TABLE House(
  House_ID INT NOT NULL AUTO_INCREMENT COMMENT '房源id，自增',
  House_Users_ID INT NOT NULL COMMENT '房东id',
  House_Area INT NOT NULL COMMENT '房源面积',
	House_AreaType VARCHAR(15) NOT NULL DEFAULT '平方米' COMMENT '房源面积类型',
  House_Profile VARCHAR(400) COMMENT '房源简介',
	House_City VARCHAR(40) NOT NULL COMMENT '房源所在市',
	House_District VARCHAR(40) NOT NULL COMMENT '房源所在区', 
  House_Address VARCHAR(80) NOT NULL COMMENT '房源详细地址',
  House_Headline VARCHAR(40) NOT NULL COMMENT '房源标题',
	House_IsBan INT NOT NULL DEFAULT 0 COMMENT '被屏蔽, 1被屏蔽',
	House_Mode VARCHAR(10) NOT NULL DEFAULT 'month' COMMENT '租赁方式  (year or month)',
	House_LeaseMoney INT NOT NULL COMMENT '租金金额' ,
	House_CashDeposit INT NOT NULL COMMENT '押金',
	House_IsOpen INT NOT NULL DEFAULT 1 COMMENT '被公开， 1被公开',
	House_ElectronicContractTemplate VARCHAR(255) NOT NULL COMMENT '电子合同模板', 
	PRIMARY KEY(House_ID),
	FOREIGN KEY(House_Users_ID) REFERENCES Users(Users_ID)
) AUTO_INCREMENT = 1;

INSERT INTO House(House_Users_ID, House_Area, House_AreaType,House_Profile, House_City, House_District,House_Address, House_Headline, House_LeaseMoney,House_CashDeposit, House_ElectronicContractTemplate) VALUES
(1, '60', '平方米','这个房源很神秘', '成都市', '武侯区','XXX路1号—XXX小区-10栋-504','XXXX大学学区房', '1000','400', '这个房东很懒没有留下模板');

CREATE TABLE HouseImg(
	HouseImg_House_ID INT NOT NULL COMMENT '房源id',
	HouseImg_FileName varchar(40) NOT NULL COMMENT '图片名称',
	PRIMARY KEY(HouseImg_House_ID, HouseImg_FileName),
	FOREIGN KEY(HouseImg_House_ID) REFERENCES House(House_ID)
);

-- Lemon
CREATE TABLE HouseLeaseOrderForm(
	HouseLeaseOrderForm_ID INT AUTO_INCREMENT COMMENT '房屋租赁ID',
	HouseLeaseOrderForm_House_ID INT NOT NULL COMMENT '房源ID',
	HouseLeaseOrderForm_Users_ID INT NOT NULL COMMENT '租客ID',
	HouseLeaseOrderForm_LeaseMoney INT NOT NULL COMMENT '租金金额',
	HouseLeaseOrderForm_StartTime DATE NOT NULL COMMENT '开始时间',
	HouseLeaseOrderForm_EndTime DATE NOT NULL COMMENT '结束时间',
	HouseLeaseOrderForm_ElectronicContract VARCHAR(225) NOT NULL COMMENT '电子合同 UUID1形式',
	HouseLeaseOrderForm_IsBan INT NOT NULL DEFAULT 0 COMMENT '被屏蔽， 1被屏蔽',
	PRIMARY KEY(HouseLeaseOrderForm_ID),
	FOREIGN KEY(HouseLeaseOrderForm_House_ID) REFERENCES House(House_ID),
	FOREIGN KEY(HouseLeaseOrderForm_Users_ID) REFERENCES Users(Users_ID)
) AUTO_INCREMENT = 1;

INSERT INTO HouseLeaseOrderForm(HouseLeaseOrderForm_House_ID, HouseLeaseOrderForm_Users_ID, HouseLeaseOrderForm_LeaseMoney, HouseLeaseOrderForm_StartTime,
HouseLeaseOrderForm_EndTime, HouseLeaseOrderForm_ElectronicContract) VALUES
(1, 1, '5000', '2018-2-1', '2018-12-1', '没有签定电子合同');


