export interface ICrudRepository<Entity, CreateDto, UpdateDto> {
  create(createDto: CreateDto): Promise<Entity>;
  findAll(): Promise<Entity[]>;
  findOne(id: string): Promise<Entity>;
  update(id: string, updateDto: UpdateDto): Promise<Entity>;
  deleteOne(id: string): Promise<Entity>;
}
