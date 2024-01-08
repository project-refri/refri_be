export interface ICrudRepository<Entity, CreateDto, UpdateDto> {
  create(createDto: CreateDto): Promise<Entity>;

  findOne(id: string | number): Promise<Entity>;

  findAll(): Promise<Entity[]>;

  update(id: string | number, updateDto: UpdateDto): Promise<Entity>;

  deleteOne(id: string | number): Promise<Entity>;
}
