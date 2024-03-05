# API Documentation

## Auth Namespace

### /auth/register
Registers a new user by name, email, password.

#### Method
Post

#### Variables
| Name | Type |
| ---- | ---- |
| name | String |
| email | String |
| password | String |

- **name**: First Name Last Name, max 128 characters, not null
- **email**: Associated email, not null, not already in database
- **password**: Will be hashed to be stored in database, not null

#### Response
| Status | Response |
|----|----|
| 200 | `{"name": <name>, "email": <email>}` |
| 400 | `{"message": "Sorry. That email already exists."}` |

### /auth/login
Logs in an existing user, required to see additional site contents.

#### Method
Post

#### Variables
| Name | Type |
| ---- | ---- |
| email | String |
| password | String |

- **email**: Email address of person attempting login
- **password**: Password associated with email address

#### Response
| Status | Response |
|----|----|
| 200 | `{"access_token": <access_token>, "refresh_token": <refresh_token>}` |
| 400 | `{"message": "Password incorrect."}` |
| 404 | `{"message": "User does not exist."}` |

### /auth/refresh
Refreshes the access token for a user. Used to maintain login state so already logged-in users do not have to login again upon page refresh.

#### Method
Post

#### Variables
| Name | Type |
| ---- | ---- |
| refresh_token | String |

- **refresh_token**: The refresh token saved by the browser for the current user

#### Response
| Status | Response |
|----|----|
| 200 | `{"access_token": <access_token>, "refresh_token": <refresh_token>}` |
| 401 | `{"message": "Invalid token."}` |

### /auth/status
Checks the login status of the current user.

#### Method
Post

#### Variables
| Name | Type |
| ---- | ---- |
| access_token | String |

- **access_token**: The access token of the current user

#### Response
| Status | Response |
|----|----|
| 200 | `{"name": <name>, "email": <email>}` |
| 401 | `{"message": "Invalid token."}` |

## Users Namespace

### /users/
Fetches all the users registered

#### Method
Get

#### Variables
None

#### Response
| Status | Response |
|----|----|
| 200 | `<UsersList>` |

    <UsersList>: [
        <User>:
            userid,
            name,
            email
    ]

## Devices Namespace

### /devices/
Fetches all the devices registered

#### Method
Get

#### Variables
None

#### Response
| Status | Response |
|----|----|
| 200 | `<DevicesList>` |

    <DevicesList>: [
        <Device>:
            deviceid,
            model,
            name,
            user.userid,
            user.name,
            user.email
    ]

## Scans Namespace

### /scans/
Fetches all the scans registered

#### Method
Get

#### Variables
None

#### Response
| Status | Response |
|----|----|
| 200 | `<ScansList>` |

    <ScansList>: [
        <Scan>:
            scanid,
            osversion,
            appversion,
            secure,
            threats,
            device.deviceid,
            device.model,
            device.name,
            user.userid,
            user.name,
            user.email
    ]
