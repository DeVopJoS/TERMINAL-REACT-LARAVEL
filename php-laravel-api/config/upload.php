
<?php 
	return [
		"tempDir" => "uploads/temp/", 
		"import" => [
			"file_name_type" => "timestamp",
			"extensions" => "json,csv",
			"limit" => "10",
			"max_file_size" => "3",
			"return_full_path" => false,
			"filename_prefix" => "",
			"upload_dir" => "uploads/files/"
		],
		
		"photo" => [
			"file_name_type" => "random",
			"extensions" => "jpg,png,gif,jpeg",
			"limit" => 1,
			"max_file_size" => 3, //in mb
			"return_full_path" => false,
			"filename_prefix" => "",
			"upload_dir" => "uploads/files",
			"image_resize" => [ 
				"small" => ["width" => 100, "height" => 100, "mode" => "cover"], 
				"medium" => ["width" => 480, "height" => 480, "mode" => "contain"], 
				"large" => ["width" => 1024, "height" => 760, "mode" => "contain"]
			],

		],
		
		"documento_url" => [
			"file_name_type" => "random",
			"extensions" => "jpg,png,gif,jpeg,docx,doc,xls,xlsx,xml,csv,pdf,xps",
			"limit" => 1,
			"max_file_size" => 3, //in mb
			"return_full_path" => false,
			"filename_prefix" => "",
			"upload_dir" => "uploads/files",
			"image_resize" => [ 
				"small" => ["width" => 100, "height" => 100, "mode" => "cover"], 
				"medium" => ["width" => 480, "height" => 480, "mode" => "contain"], 
				"large" => ["width" => 1024, "height" => 760, "mode" => "contain"]
			],

		],

	];
