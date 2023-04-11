const { AuthenticationError } = require("apollo-server-express");
const { Profile, Request } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId }).populate("requests");
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id }).populate("requests");
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    requests: async () => {
      return Request.find().populate("requestAuthor");
    },
    request: async (parent, { requestId }) => {
      return Request.findOne({ _id: requestId }).populate("requestAuthor");
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password, moneyboi}) => {
      const profile = await Profile.create({ name, email, password, moneyboi });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(profile);
      return { token, profile };
    },

    // Add a third argument to the resolver to access data in our `context`
    addSkill: async (parent, { profileId, skill }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: profileId },
          {
            $addToSet: { skills: skill },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError("You need to be logged in!");
    },
    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // Make it so a logged in user can only remove a skill from their own profile
    removeSkill: async (parent, { skill }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate({ _id: context.user._id }, { $pull: { skills: skill } }, { new: true });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addRequest: async (parent, args, context) => {
      if (context.user) {
        const request = await Request.create({ ...args, requestAuthor: context.user._id });

        await Profile.findByIdAndUpdate({ _id: context.user._id }, { $addToSet: { requests: request._id } }, { new: true });

        return request;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateRequest: async (parent, args, context) => {
      if (context.user) {
        return Request.findOneAndUpdate({ _id: args.requestId }, { ...args }, { new: true });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updateMoneyboi: async (parent, { moneyboi }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate({ _id: context.user._id }, { moneyboi }, { new: true });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
