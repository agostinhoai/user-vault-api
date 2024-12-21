const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getAllContacts = asyncHandler(async (req, res) => {
    try {
        const contacts = await Contact.find({ user_id: req.user.id });
        res.status(200).json(contacts);
    } catch (error) {
        throw error;
    }
});

//@desc Create contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    try {
        const {name, email, mobile} = req.body;
        if(!name || !email || !mobile) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }      

        if (!req.user) {
            res.status(401);
            throw new Error("User not authenticated");
        }
        
        const contact = await Contact.create({
            name,
            email,
            mobile,
            user_id: req.user.id
        });

        // Add the contact data to user's contacts array
        const user = await User.findById(req.user.id);
        if (user) {
            user.contacts.push({
                name: contact.name,
                email: contact.email,
                mobile: contact.mobile
            });
            
            await user.save();
            res.status(200).json({ message: "Contact added successfully", contact });
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        throw error;
    }
});

//@desc Get contact
//@route GET /api/contacts/id
//@access private
const getContact = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400);
            throw new Error("Invalid contact ID");
        }

        const contact = await Contact.findById(id);

        if (!contact) {
            res.status(404);
            throw new Error("Contact not found");
        }

        if (contact.user_id.toString() !== req.user.id) {
            res.status(403);
            throw new Error("User doesn't have permission to access this contact");
        }

        res.status(200).json(contact);
    } catch (error) {
        throw error;
    }
});

//@desc Update contact
//@route PUT /api/contacts/id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if(!contact) {
            res.status(404);
            throw new Error("Contact not found");
        }

        if(contact.user_id.toString() !== req.user.id) {
            res.status(403);
            throw new Error("User doesn't have permission to update this contact");
        }

        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        // Update the contact in user's contacts array
        const user = await User.findById(req.user.id);
        if (user) {
            const contactIndex = user.contacts.findIndex(c => c._id.toString() === req.params.id);
            if (contactIndex !== -1) {
                user.contacts[contactIndex] = {
                    name: updatedContact.name,
                    email: updatedContact.email,
                    mobile: updatedContact.mobile
                };
                await user.save();
            }
        }

        res.status(200).json(updatedContact);
    } catch (error) {
        throw error;
    }
});

//@desc Delete contact
//@route DELETE /api/contacts/id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if(!contact) {
            res.status(404);
            throw new Error("Contact not found");
        }

        if(contact.user_id.toString() !== req.user.id) {
            res.status(403);
            throw new Error("User doesn't have permission to delete this contact");
        }

        await Contact.deleteOne({ _id: req.params.id });

        // Remove the contact from user's contacts array
        const user = await User.findById(req.user.id);
        if (user) {
            user.contacts = user.contacts.filter(c => c._id.toString() !== req.params.id);
            await user.save();
        }

        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        throw error;
    }
});

module.exports = {
    getAllContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
};