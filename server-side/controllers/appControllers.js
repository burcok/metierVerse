import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";

/** POST: http://localhost:8080/api/register
 * @params : {
  "username": "example123",
  "password": "admin123",
  "email": "example@gmail.com",
  "firstName": "bill",
  "lastName": "william",
  "phone": "05555555555",
  "profile": ""
}
*/
export async function register(req, res) {
    try {
        const { username, password, email, profile } = req.body;

        // Check for username
        const existingUsername = await UserModel.findOne({ username }).exec();

        if (existingUsername) {
            return res.status(400).json({ error: "Please use a unique username." });
        }

        // Check for email
        const existingEmail = await UserModel.findOne({ email }).exec();

        if (existingEmail) {
            return res.status(400).json({ error: "Please use a unique email." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const user = new UserModel({
            username,
            password: hashedPassword,
            profile: profile || '',
            email
        });

        // Save the user to the database
        await user.save();

        // Return a success response
        return res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
}

/** POST: http://localhost:8080/api/login
 * @params : {
  "username": "example123",
  "password": "admin123",
}
*/
export async function login(req, res) {
    const { username, password } = req.body;
    try {
        // Check for username
        const user = await UserModel.findOne({ username }).exec();

        if (!user) {
            return res.status(400).json({ error: "Username does not exist." });
        }

        // Check for password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: "Password is incorrect." });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username
            },
            ENV.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Return a success response with token and username
        return res.status(200).json({
            message: "User logged in successfully.",
            username: user.username,
            token
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
}



/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res){
    res.json('getUser route');
}

/** PUT: http://localhost:8080/api/updateUser
 * @params : {
    "id" : "example123",
}
body:  {
    "firstName": "",
    profile: ""
} 
*/
export async function updateUser(req, res){
    res.json('updateUser route');
}

/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req, res){
    res.json('generateOTP route');
}

/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res){
    res.json('verifyOTP route');
}

// succesfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res){
    res.json('createResetSession route');
}

/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res){
    res.json('resetPassword route');
}