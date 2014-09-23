class AddAttachmentImgUrlToPictures < ActiveRecord::Migration
  def self.up
    change_table :pictures do |t|
      t.attachment :img_url
    end
  end

  def self.down
    remove_attachment :pictures, :img_url
  end
end
