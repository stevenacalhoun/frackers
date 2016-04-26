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

ActiveRecord::Schema.define(version: 20160425171759) do

  create_table "pollution_entries", force: :cascade do |t|
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.string   "project_id"
    t.string   "location_id"
    t.string   "characteristic_name"
    t.string   "start_date"
    t.string   "end_date"
    t.decimal  "value"
    t.string   "unit_code"
    t.string   "type"
    t.string   "latitude"
    t.string   "longitude"
    t.integer  "country_code"
    t.integer  "state_code"
  end

  create_table "well_entries", id: false, force: :cascade do |t|
    t.string   "id"
    t.string   "owner"
    t.float    "latitude"
    t.float    "longitude"
    t.string   "state"
    t.string   "city"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "well_ingredients", force: :cascade do |t|
    t.string   "well_key"
    t.string   "prupose_key"
    t.string   "ingredient_name"
    t.float    "percent_high_additive"
    t.float    "percent_mass"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.string   "ingredient_key"
    t.string   "purpose_key"
  end

  create_table "well_ingridents", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "well_purposes", force: :cascade do |t|
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "purpose_key"
    t.string   "well_key"
    t.string   "purpose"
    t.string   "trade_name"
  end

end
