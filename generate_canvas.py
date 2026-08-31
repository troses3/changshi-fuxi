import json
import uuid
import os

class CanvasBuilder:
    def __init__(self):
        self.nodes = []
        self.edges = []
        self.current_x = 0
        self.current_y = 0

    def generate_id(self):
        return uuid.uuid4().hex[:16]

    def add_text_node(self, text, x, y, width=400, height=150, color=None):
        node_id = self.generate_id()
        node = {
            "id": node_id,
            "type": "text",
            "text": text,
            "x": x,
            "y": y,
            "width": width,
            "height": height
        }
        if color:
            node["color"] = color
        self.nodes.append(node)
        return node_id, node

    def add_file_node(self, file_path, x, y, width=600, height=800):
        node_id = self.generate_id()
        node = {
            "id": node_id,
            "type": "file",
            "file": file_path,
            "x": x,
            "y": y,
            "width": width,
            "height": height
        }
        self.nodes.append(node)
        return node_id, node

    def add_group_node(self, label, x, y, width, height, color="1"):
        node_id = self.generate_id()
        node = {
            "id": node_id,
            "type": "group",
            "label": label,
            "x": x,
            "y": y,
            "width": width,
            "height": height,
            "color": color
        }
        self.nodes.append(node)
        return node_id, node

    def add_edge(self, from_node, to_node, from_side="right", to_side="left"):
        self.edges.append({
            "id": self.generate_id(),
            "fromNode": from_node,
            "fromSide": from_side,
            "toNode": to_node,
            "toSide": to_side
        })

    def save(self, output_path):
        canvas_data = {
            "nodes": self.nodes,
            "edges": self.edges
        }
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(canvas_data, f, indent=2, ensure_ascii=False)
        print(f"Canvas saved to {output_path}")

def build_nested_group_canvas(mapping_data, output_path, image_base_path=""):
    builder = CanvasBuilder()
    
    # Constants for layout
    PADDING = 60
    NODE_SPACING_X = 200
    NODE_SPACING_Y = 100
    
    start_x = 0
    start_y = 0
    
    # We will lay out major categories vertically
    current_cat_y = start_y
    
    colors = ["1", "2", "3", "4", "5", "6"]
    color_idx = 0
    
    for category, subtopics in mapping_data.items():
        cat_group_color = colors[color_idx % len(colors)]
        color_idx += 1
        
        # Calculate bounding box for this category
        cat_x_min = start_x
        cat_y_min = current_cat_y
        
        # Add category title text node
        cat_title_x = cat_x_min + PADDING
        cat_title_y = cat_y_min + PADDING
        cat_text_id, _ = builder.add_text_node(f"# {category}", cat_title_x, cat_title_y, width=300, height=100)
        
        current_sub_y = cat_title_y + 150 + PADDING
        
        # Keep track of the maximum X and Y reached in this category
        cat_max_x = cat_title_x + 300
        cat_max_y = current_sub_y
        
        for subtopic_name, images in subtopics.items():
            # Add subtopic text node
            sub_x = cat_title_x + 50
            sub_y = current_sub_y
            sub_text_id, sub_node = builder.add_text_node(f"### {subtopic_name}", sub_x, sub_y, width=250, height=80)
            builder.add_edge(cat_text_id, sub_text_id, from_side="bottom", to_side="top")
            
            # Lay out images for this subtopic horizontally
            current_img_x = sub_x + 250 + NODE_SPACING_X
            max_img_h = 0
            
            for img in images:
                # Add file node
                img_path = os.path.join(image_base_path, img['filename'])
                img_id, img_node = builder.add_file_node(img_path, current_img_x, sub_y, width=800, height=1000)
                builder.add_edge(sub_text_id, img_id, from_side="right", to_side="left")
                
                # Optional: Add note text if provided
                if 'note' in img and img['note']:
                    note_id, _ = builder.add_text_node(img['note'], current_img_x, sub_y + 1000 + 40, width=800, height=100)
                    builder.add_edge(img_id, note_id, from_side="bottom", to_side="top")
                    max_img_h = max(max_img_h, 1000 + 40 + 100)
                else:
                    max_img_h = max(max_img_h, 1000)
                
                cat_max_x = max(cat_max_x, current_img_x + 800)
                current_img_x += 800 + NODE_SPACING_X
            
            current_sub_y += max_img_h + NODE_SPACING_Y
            cat_max_y = max(cat_max_y, current_sub_y)
        
        # Add the bounding group for the category
        cat_width = (cat_max_x - cat_x_min) + PADDING * 2
        cat_height = (cat_max_y - cat_y_min) + PADDING * 2
        
        builder.add_group_node(category, cat_x_min, cat_y_min, cat_width, cat_height, color=cat_group_color)
        
        # Move down for the next category
        current_cat_y += cat_height + 200

    builder.save(output_path)

if __name__ == "__main__":
    # Test data (will be replaced by actual mappings)
    test_mapping = {
        "位置规律": {
            "平移": [
                {"filename": "test1.jpg", "note": "宫格类，注意内外分开看"}
            ],
            "旋转": [
                {"filename": "test2.jpg", "note": "时针法"}
            ]
        }
    }
    # build_nested_group_canvas(test_mapping, "test_output.canvas")
    pass
