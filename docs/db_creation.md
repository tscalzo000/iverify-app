    CREATE TABLE tbluser (
        userid BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL,
        password VARCHAR(255) NOT NULL,
        active BOOLEAN DEFAULT TRUE NOT NULL,
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    );

    CREATE TABLE tbldevice (
        deviceid BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        userid BIGINT REFERENCES tbluser(userid),
        name VARCHAR(128) NOT NULL,
        model VARCHAR(128) NOT NULL
    );

    CREATE TABLE tblscan (
        scanid BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        deviceid BIGINT REFERENCES tbldevice(deviceid),
        osversion VARCHAR(128) NOT NULL,
        appversion VARCHAR(128) NOT NULL,
        secure BOOLEAN NOT NULL,
        threats VARCHAR(255)
    );
