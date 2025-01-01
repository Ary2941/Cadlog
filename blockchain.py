import hashlib

class Block:
    def __init__(self, previous_block_hash, transaction_list):
        self.previous_block_hash = previous_block_hash
        self.transaction_list = transaction_list

        self.block_data = "-".join(transaction_list) + "-" + previous_block_hash
        self.block_hash = hashlib.sha256(self.block_data.encode()).hexdigest()


t1 = "anna sends 2 NC to Mike"
t2 = "mike sends 2 NC to phil"
t3 = "phil sends 2 NC to anna"


initial_block = Block("Initial String",[t1,t2])

print(initial_block.block_data)
print(initial_block.block_hash)
