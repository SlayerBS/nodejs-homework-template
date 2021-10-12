const express = require("express");
const router = express.Router();

const {
  validateContact,
  validateStatusContact,
  validateId,
} = require("./validation");

const {
  getAllContacts,
  getContactById,
  addContact,
  changeContact,
  updateContact,
  deleteContact,
} = require("../../controllers/contacts.controller");

const guard = require("../../helpers/guard");

router.get("/", guard, getAllContacts);

router.get("/:contactId", guard, validateId, getContactById);

router.post("/", guard, validateContact, addContact);

router.delete("/:contactId", guard, validateId, deleteContact);

router.put("/:contactId", guard, validateId, validateContact, changeContact);

router.patch(
  "/:contactId/favorite/",
  guard,
  validateId,
  validateStatusContact,
  updateContact
);

module.exports = router;
