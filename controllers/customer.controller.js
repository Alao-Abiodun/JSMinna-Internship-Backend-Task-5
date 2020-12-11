const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Customer = require('../models/customer.model');

class CustomerController {
  async signIn(req, res) {
    try {
      const {
        fullname,
        email,
        phone_number,
        address,
        gender,
        password,
      } = req.body;
      if (!fullname || !email || !password) {
        return res.status(400).json({
          status: 'error',
          data: {
            message: 'Please fill in the required Credentials',
          },
        });
      }
      const user = await Customer.findOne({ email });
      if (user) {
        return res.status(400).json({
          status: 'error',
          data: {
            message: 'Credentials already exist',
          },
        });
      }
      const genSalt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, genSalt);
      const customer = new Customer({
        fullname,
        email,
        phone_number,
        address,
        gender,
        password: hashPassword,
      });
      const savedCustomer = await customer.save();
      const token = await jwt.sign(
        { id: savedCustomer._id },
        'customer_secretKey',
        {
          expiresIn: '2h',
        }
      );
      if (!savedCustomer) {
        return res.status(404).json({
          status: 'error',
          data: {
            message: 'There is an error a creating a new user',
          },
        });
      }
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'User successfully created',
          data: savedCustomer,
          token,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: error,
        data: {
          message: 'Server Error',
        },
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          status: 'error',
          data: {
            message: 'The Credentials are incorrect',
          },
        });
      }
      const user = await Customer.findOne({ email });
      if (!user) {
        return res.status(404).json({
          status: 'error',
          data: {
            message: 'Credential does not exist',
          },
        });
      }
      const confirmPassword = await bcrypt.compare(password, user.password);
      if (!confirmPassword) {
        return res.status(400).json({
          status: 'error',
          data: {
            message: 'password credentials does not match',
          },
        });
      }
      const token = await jwt.sign(
        { email: user.email },
        'customer_secretKey',
        {
          expiresIn: 3600,
        }
      );
      const data = {
        fullname: user.fullname,
        email: user.email,
        phone_number: user.phone_number,
        address: user.address,
        gender: user.gender,
      };
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'User login sucessfully',
          data,
          token,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: error,
        data: {
          message: 'Server Error',
        },
      });
    }
  }
}

module.exports = new CustomerController();
