const Dog = require('../models/Dog');

// Controller to register a new dog
exports.registerDog = async (req, res) => {
  try {
    const { name, description } = req.body;
    // Assume req.user.id contains the authenticated user's ID
    const owner = req.user.id;
    const dog = new Dog({ name, description, owner });
    await dog.save();
    res.status(201).json({ message: 'Dog registered successfully', dog });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller to adopt a dog
exports.adoptDog = async (req, res) => {
  try {
    const { dogId } = req.params;
    const userId = req.user.id;
    const dog = await Dog.findById(dogId);
    // Checks if dog is available for adoption
    if (!dog) return res.status(404).json({ error: 'Dog not found' });
    if (dog.adoptedBy)
      return res.status(400).json({ error: 'Dog already adopted' });
    // Assigns dog to user per adoption
    dog.adoptedBy = userId;
    dog.adoptedAt = new Date();
    await dog.save();
    res.json({ message: 'Dog adopted successfully', dog });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller to remove a dog
exports.removeDog = async (req, res) => {
  try {
    const { dogId } = req.params;
    const dog = await Dog.findById(dogId);
    if (!dog) return res.status(404).json({ error: 'Dog not found' });
    // Only allow removal if the dog has not been adopted
    if (dog.adoptedBy)
      return res.status(400).json({ error: 'Cannot remove an adopted dog' });
    // Only the owner can remove the dog
    if (dog.owner.toString() !== req.user.id)
      return res.status(403).json({ error: 'Unauthorized' });
    await dog.remove();
    res.json({ message: 'Dog removed successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller to list dogs registered by the user (with pagination)
exports.listRegisteredDogs = async (req, res) => {
  try {
    const userId = req.user.id;
    // Extract page and limit from query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Query dogs for user with pagination
    const dogs = await Dog.find({ owner: userId }).skip(skip).limit(limit);
    res.json({ dogs, page, limit });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller to list dogs adopted by the user (with pagination)
exports.listAdoptedDogs = async (req, res) => {
  try {
    const userId = req.user.id;
    // Extract page and limit from query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Query dogs for the user with pagination
    const dogs = await Dog.find({ adoptedBy: userId }).skip(skip).limit(limit);
    res.json({ dogs, page, limit });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
