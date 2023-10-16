export interface ICrudRepository<Entity, CreateDto, UpdateDto, FilterDto> {
  create(createDto: CreateDto): Promise<Entity>;
  findAll(filterDto: FilterDto): Promise<Entity[]>;
  findOne(id: string): Promise<Entity>;
  update(id: string, updateDto: UpdateDto): Promise<Entity>;
  deleteOne(id: string): Promise<Entity>;
}
