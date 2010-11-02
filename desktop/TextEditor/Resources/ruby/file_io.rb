# File IO is so much easier in Ruby.
# We're just wrapping the File class's methods here.

# Read a file and return the contents as a string
def read_file(filename)
  File.read(filename)  
end

# write the contents to the specified file.
def write_file(filename, contents)
  File.open(filename "w") do |f|
    f << contents
  end
end