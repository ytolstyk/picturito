# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140927011544) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: true do |t|
    t.integer  "owner_id",                   null: false
    t.integer  "user_id",                    null: false
    t.string   "action",                     null: false
    t.integer  "picture_id",                 null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "viewed",     default: false
  end

  add_index "activities", ["owner_id"], name: "index_activities_on_owner_id", using: :btree
  add_index "activities", ["picture_id"], name: "index_activities_on_picture_id", using: :btree
  add_index "activities", ["user_id"], name: "index_activities_on_user_id", using: :btree

  create_table "avatars", force: true do |t|
    t.integer  "user_id"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "avatars", ["user_id"], name: "index_avatars_on_user_id", using: :btree

  create_table "comments", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "picture_id", null: false
    t.text     "body",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["picture_id"], name: "index_comments_on_picture_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "picture_likes", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "picture_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "picture_likes", ["picture_id"], name: "index_picture_likes_on_picture_id", using: :btree
  add_index "picture_likes", ["user_id", "picture_id"], name: "index_picture_likes_on_user_id_and_picture_id", unique: true, using: :btree
  add_index "picture_likes", ["user_id"], name: "index_picture_likes_on_user_id", using: :btree

  create_table "pictures", force: true do |t|
    t.string   "title",                default: "*"
    t.text     "description"
    t.integer  "user_id",                            null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "img_url_file_name"
    t.string   "img_url_content_type"
    t.integer  "img_url_file_size"
    t.datetime "img_url_updated_at"
    t.integer  "views",                default: 0
  end

  add_index "pictures", ["user_id"], name: "index_pictures_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "username",                    null: false
    t.string   "password_digest",             null: false
    t.string   "session_token",               null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "picture_id",      default: 0
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", using: :btree

end
